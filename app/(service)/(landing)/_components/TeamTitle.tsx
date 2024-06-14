import React from "react";
import NextImage from "next/image";
import { MatchTeams } from "@/model/match";

export default function TeamTitle({
    team,
    selectTeam,
    handleImageLoad,
}: {
    team: MatchTeams;
    selectTeam: string;
    handleImageLoad: () => void;
}) {
    return (
        <div className={`flex flex-1 flex-col items-center justify-center`}>
            {selectTeam === team.code ? (
                <div className="w-10 rounded-[5px] border border-red-500 bg-red-500 text-xs">
                    선택
                </div>
            ) : (
                <div className="h-4 w-10 text-xs"></div>
            )}
            <div>{team.code}</div>
            <NextImage
                src={`${team.image}`}
                width={60}
                height={60}
                alt="team"
                onLoad={handleImageLoad}
            />
            <div className="h-6">{team.name}</div>
        </div>
    );
}
