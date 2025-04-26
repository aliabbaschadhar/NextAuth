import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import { EmailType, sendEmail } from "@/helpers/mailer";


connect();


export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        console.log("Login request", email, password);
        //Check user already exists or not
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                msg: "User not found",
                success: false
            })
        }
        //Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                msg: "Invalid password",
                success: false
            })
        }
        // token data
        const tokenData = {
            id: user._id,
            email: user.email,
            password: user.password,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: "1d" });
        const response = NextResponse.json({
            msg: "Login successful",
            success: true,
            token,
        })

        response.cookies.set("token", token, {
            httpOnly: true // Make sure to set the cookie as httpOnly which means it can't be accessed by client-side JavaScript
        })

        await sendEmail({
            email,
            emailType: EmailType.VERIFY,
            userId: user._id
        })

        return response;
    } catch (error) {
        return NextResponse.json({ errorMsg: "Internal Server Error", error: error }, { status: 500 })

    }
}