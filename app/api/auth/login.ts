import { NextResponse } from "next/server";
import { login } from "@/lib/settingToken";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name } = body;
    await login({ email, name });
    return NextResponse.json({ success: true });
}
