"use client";

import { useMemo } from "react";
import { Result } from "@/model/match";

export default function usePanelColor(teamResult: Result | null) {
    const panelColor = useMemo(() => {
        if (!teamResult || teamResult.outcome === null) {
            return "bg-gray-800 hover:bg-gray-500 text-white";
        }

        return teamResult.outcome === "win"
            ? "bg-blue-700 dark:bg-green-500"
            : "bg-gray-900 opacity-[0.2] dark:opacity-1 text-white";
    }, [teamResult]);

    return panelColor;
}
