"use client";

import { useMemo } from "react";
import { Result } from "@/model/match";

export default function usePanelColor(teamResult: Result | null) {
    const panelColor = useMemo(() => {
        if (!teamResult || teamResult.outcome === null) {
            return "bg-gray-800 opacity-1";
        }

        return teamResult.outcome === "win"
            ? "bg-green-500 hover:bg-green-400"
            : "bg-gray-500 opacity-15";
    }, [teamResult]);

    return panelColor;
}
