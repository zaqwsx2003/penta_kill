"use client";

import React, { useEffect, useState } from "react";

import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import TeamPanel from "@/app/(service)/(landing)/_components/TeamPanel";
import { useIncreasePanel } from "@/app/(service)/(landing)/_lib/useIncreasePanel";
import { DaysMatch } from "@/model/Match";
import { useGameStatusState } from "@/lib/gameStatueStore";

type MatchCardProps = {
    matches: DaysMatch;
};

export default function MatchCard({ matches }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);

    const outcomeNull = matches?.match?.teams?.some(
        (team: any) => team.result === null || team.result.outcome === null
    );

    console.log("matches", matches);

    return (
        <div className='flex justify-between flex-col gap-2' key={matches.match.id}>
            <div className='flex gap-2 font-bold pl-2'>
                <span>{KoreanDateFormat(matches.startTime)}</span>
                <span>{matches.league?.name}</span>
                <span>{matches.blockName}</span>
            </div>
            <div>
                <div className='flex'>
                    <TeamPanel
                        match={matches.match.teams}
                        position={0}
                        matchState={matches.state}
                    />
                    <TeamPanel
                        match={matches.match.teams}
                        position={1}
                        matchState={matches.state}
                    />
                </div>
            </div>
        </div>
    );
}
