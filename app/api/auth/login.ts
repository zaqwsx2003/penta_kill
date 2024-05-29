// "use server";

// import { NextApiRequest, NextApiResponse } from "next";
// import { signIn } from "next-auth/react";

// export default async function login(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//         return res.status(405).end();
//     }

//     const { email, password } = req.body;

//     try {
//         const result = await signIn("credentials", {
//             redirect: false,
//             email,
//             password,
//         });

//         if (result?.error) {
//             res.status(401).json({ error: result.error });
//         } else {
//             res.status(200).json({ message: "로그인 성공", ...result });
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
//     }
// }
