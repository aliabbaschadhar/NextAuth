import { connect } from "@/dbConfig/dbConfig";
import { EmailType, sendEmail } from "@/helpers/mailer";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {

    try {
        const { email } = await request.json();

        const user = await User.findOne({
            email
        })

        if (!user) {
            return NextResponse.json({
                message: "User doesn't exists"
            }, {
                status: 403
            })
        }

        await sendEmail({
            email: email,
            emailType: EmailType.RESET,
            userId: user._id
        })

        return NextResponse.json({
            message: "Password reset email is sent",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, {
            status: 500
        })
    }

}