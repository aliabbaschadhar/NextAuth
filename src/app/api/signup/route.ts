import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


connect();

export async function POST(req: NextRequest) {
    try {
        // use zod here 
        const { username, password, email } = await req.json();
        //Check user already exists or not 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                msg: "User already exists",
                existingUser
            })
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email
        })

        console.log(newUser)

        return NextResponse.json({
            newUser,
            msg: "User created sucessfully",
            success: true
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ errorMsg: "Internal Server Error", error: error }, { status: 500 });
    }
}