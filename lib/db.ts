import { createPool } from "mysql2";

const pool = createPool({
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    user: process.env.NEXT_PUBLIC_MYSQL_USER,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    port: 3306,
});

pool.getConnection((err, conn) => {
    if (err) console.log("Error connecting to db...");
    else console.log("Connected to db...!");
    conn.release();
});

export default function ExecuteQuery(query: string, arrParams: any) {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arrParams, (err, data) => {
                if (err) {
                    console.log("Error in executing the query");
                    reject(err);
                }
                console.log("------db.jsx------");
                //console.log(data)
                resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    });
}
