import { auth } from "@/auth";
import React from "react";

export async function middleware() {
    const session = await auth();
}

export const config = {
    matcher: [],
  }