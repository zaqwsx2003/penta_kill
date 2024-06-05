"use client";

import { useMemo } from "react";
import { MatchTeams } from "@/model/Match";

type PanelColorProps = {
    team: MatchTeams;
    matchState: string;
};

export default function usePanelColor({ team, matchState }: PanelColorProps) {
    const panelColor = useMemo(() => {
        if (matchState === "unstarted" && team.code) {
            return "hover:bg-blue-500";
        } else if (
            team?.result?.outcome === null &&
            team?.code === "TBD" &&
            matchState === "unstarted"
        ) {
            return "bg-gray-800 text-white";
        }

        return team?.result?.outcome === "win"
            ? "bg-blue-700 dark:bg-green-500"
            : "bg-gray-900 opacity-[0.2] dark:opacity-1 text-white";
    }, [team, matchState]);

    return panelColor;
}
