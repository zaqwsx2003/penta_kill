import { NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        const [rows]: any = await pool.query(
            "SELECT * FROM user WHERE email = ?",
            [email],
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { message: "이메일 또는 비밀번호가 틀렸습니다." },
                { status: 400 },
            );
        }

        return NextResponse.json({ message: "" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "연결이 원활하지 않습니다." },
            { status: 500 },
        );
    }
}
