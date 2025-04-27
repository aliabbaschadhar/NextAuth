// domain.com/verifyToken/ajfdlajldewr231 
// ===> Use this when you are working with a server component so that you can grab it using params.id in nextjs [id] syntax
// domain.com/verifiyToken?token=adefagdlagja
// ===> Use this when you are working in client component in nextjs

import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export enum EmailType {
    VERIFY = "VERIFY",
    RESET = "RESET",
}

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 5);
        const { VERIFY, RESET } = EmailType;

        if (emailType === VERIFY) {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if (emailType === EmailType.RESET) {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const verifyUrl = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
        const resetUrl = `${process.env.DOMAIN}/forgetpassword?token=${hashedToken}`;
        const actionUrl = emailType === VERIFY ? verifyUrl : resetUrl;

        const mailOptions = {
            from: "try.aliabbaschadhar@gmail.com",
            to: email,
            subject: emailType === VERIFY ? "Verify your email" : "Reset your password",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>${emailType === VERIFY ? "Email Verification" : "Password Reset"}</h2>
                <p>
                Click <a href="${actionUrl}">${emailType === VERIFY ? "verify your email" : "reset your password"}</a> 
                or copy and paste the link below in your browser:
                </p>
                <p style="background-color: #f5f5f5; padding: 10px; border-radius: 4px;">
                <a href="${actionUrl}">${actionUrl}</a>
                </p>
                <p>If you did not request this, please ignore this email.</p>
                <p>Thank you!</p>
            </div>
            `
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}