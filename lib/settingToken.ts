"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("60m")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function login(user: { email: string; name: string }) {
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ user, expires });
    cookies().set("Access_Token", session, { expires, httpOnly: true });
}

export async function logout() {
    cookies().set("Access_Token", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("Access_Token")?.value;
    console.log("session", session);
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("Access_Token")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "Access_Token",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
