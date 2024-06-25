import React from "react";
import NextImage from "next/image";

import { ImageLoaderProps, MatchTeams } from "@/model/match";
import { useMatchState } from "@/lib/matchStore";
import { useTeamState } from "@/lib/teamStore";

export default function TeamTitle({
    team,
    selectTeam,
    handleImageLoad,
}: {
    team: MatchTeams;
    selectTeam: string;
    handleImageLoad: () => void;
}) {
    const match = useMatchState((state) => state);
    const teamState = useTeamState((state) => state);

    // const httpsURL = team.image.replace("http://", "https://");

    // consol

    // const teamImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    //     return `${team.image}?w=${width}&q=${quality || 75}`;
    // };

    return (
        <div className={`flex flex-1 flex-col items-center justify-center`}>
            {match.matchState === "completed" &&
            team.result?.outcome === "win" ? (
                <div className="w-10 rounded-[5px] border border-red-500 bg-red-500 text-xs">
                    승리
                </div>
            ) : match.matchState === "unstarted" && selectTeam === team.code ? (
                <div className="w-10 rounded-[5px] border border-red-500 bg-red-500 text-xs">
                    선택
                </div>
            ) : (
                <div className="h-4 w-10 text-xs"></div>
            )}
            <div>{team.code}</div>
            <NextImage
                // loader={teamImageLoader}
                src={team.image}
                width={60}
                height={60}
                alt="team"
                onLoad={handleImageLoad}
            />
            <div className="h-6">{team.name}</div>
        </div>
    );
}
