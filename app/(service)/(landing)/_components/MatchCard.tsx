"use client";

import React from "react";

import useKoreanDateFormat from "@/lib/useDate";
import TeamPanel from "@/app/(service)/(landing)/_components/TeamPanel";
import { DaysMatch } from "@/model/match";
import MatchState from "@/app/(service)/(landing)/_components/MatchState";
import BettingResult from "@/app/(service)/(landing)/_components/BettingResult";

type MatchCardProps = {
    matches: DaysMatch;
};

export default function MatchCard({ matches }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);

    console.log(matches);

    return (
        <div
            className="flex flex-col justify-between gap-2"
            key={matches.match.id}
        >
            <div className="flex items-center gap-2 pl-2 text-center font-bold">
                <div className="flex items-center justify-center rounded-[5px] bg-blue-600 px-1 text-white">
                    <span className="text-base leading-5">
                        {matches.league?.name}
                    </span>
                </div>
                <span className="text-white">
                    {KoreanDateFormat(matches.startTime)}
                </span>
                {!/주 차/.test(matches.blockName) && (
                    <span className="text-white">{matches.blockName}</span>
                )}
                <MatchState matchState={matches.state} />
                <BettingResult
                    matchState={matches.state}
                    bettingState={matches.match.betting}
                    bettingResult={matches.match.status}
                />
            </div>
            <div className={`flex rounded-[10px]`}>
                {matches.match.teams?.map((team, index) => (
                    <TeamPanel
                        key={index}
                        match={matches.match}
                        position={index as 0 | 1}
                        matchTime={matches.startTime}
                        matchState={matches.state}
                    />
                ))}
            </div>
        </div>
    );
}
