import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const token = reqBody.token;

        console.log(token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })
        console.log(user)

        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successful",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false
        }, {
            status: 500
        })
    }
}