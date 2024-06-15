import React from "react";
import LoginForm from "../_components/Login-form";
import ExecuteQuery from "@/lib/db";

export default async function Page(req: any, res: any) {
    if (req.method === "POST") {
        let sql =
            "INSERT INTO user(user_email, user_name, user_pw) VALUES(?,?,?)";
        let user_email = req.body.email;
        let user_name = req.body.name;

        try {
            let result = await ExecuteQuery(sql, [
                user_email,
                user_name,
            ]);
            console.log(result);
            return res.redirect(302, "/list");
        } catch (error) {
            console.log(error);
        }
    }
    return <LoginForm />;
}
