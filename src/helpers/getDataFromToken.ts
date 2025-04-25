import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        return decoded.id;
    } catch (error: any) {
        throw new Error(error.message)
    }
}