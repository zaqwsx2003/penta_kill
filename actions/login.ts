import { z } from "zod";
import { LoginSchema } from "@/schema";

export default async function login(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, code } = validatedFields.data;


    // api가 들어가야 한다.
    const existingUser = await getUserByEmail(email);
}
