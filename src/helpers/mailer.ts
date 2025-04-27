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

        if (emailType === EmailType.VERIFY) {
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

        const mailOptions = {
            from: "try.aliabbaschadhar@gmail.com",
            to: email,
            subject: emailType === EmailType.VERIFY ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === EmailType.VERIFY ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser: <br />
                <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a>
                <br />
                <br />
                <p>If you did not request this, please ignore this email.</p>
                <p>Thank you!</p>
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}