import { NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { message: "이메일을 입력해주세요." },
                { status: 400 },
            );
        }

        const [rows]: any = await pool.query(
            "SELECT * FROM user WHERE email = ?",
            [email],
        );

        if (rows.length > 0) {
            return NextResponse.json(
                { message: "이미 가입된 이메일입니다." },
                { status: 400 },
            );
        } else {
            return NextResponse.json(
                { message: "사용 가능한 이메일입니다." },
                { status: 200 },
            );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "연결이 원활하지 않습니다." },
            { status: 500 },
        );
    }
}
