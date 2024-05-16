"use client";

import { useMemo } from "react";
import { Result } from "@/model/match";

export default function usePanelColor(teamResult: Result | null) {
    const panelColor = useMemo(() => {
        if (!teamResult || teamResult.outcome === null) {
            return "bg-gray-800 opacity-1 hover:bg-gray-500";
        }

        return teamResult.outcome === "win" ? "bg-green-500" : "bg-gray-900 ";
    }, [teamResult]);

    return panelColor;
}
