import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'token22' })

    return NextResponse.json(
        { message: "Get Token", session },
        { status: 200 }
    );
}