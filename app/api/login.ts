import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        return res.status(500).json({
            message: "올바르지 않은 요청입니다.",
        });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "이메일을 입력해주세요." });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);

        if (rows.length === 0) {
            return res.status(200).json({ message: "가입된 이메일 입니다." });
        } else {
            return res
                .status(404)
                .json({ message: "가입되지 않은 이메일 입니다." });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "인터넷 연결이 원활하지 않습니다." });
    }
}
