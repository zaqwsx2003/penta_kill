import { createPool } from "mysql2/promise";

const pool = createPool({
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    user: process.env.NEXT_PUBLIC_MYSQL_USER,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    port: parseInt(process.env.NEXT_PUBLIC_MYSQL_PORT || "3306", 10),
});

export default pool;
