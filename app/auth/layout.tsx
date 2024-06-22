import React, { ReactNode } from "react";

import { LayoutProps } from "@/model/layout";

export default function layout({ children }: LayoutProps) {
    return <div className="">{children}</div>;
}
