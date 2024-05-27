import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
    console.log("API 호출됨");
    const session = await getSession();
    console.log("세션:", session);
    return NextResponse.json({ session });
}
