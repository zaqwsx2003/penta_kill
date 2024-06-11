"use client";

import React, { useEffect } from "react";
import useKoreanDateFormat from "@/lib/useDate";
import TeamPanel from "@/app/(service)/(landing)/_components/TeamPanel";
import { DaysMatch } from "@/model/match";

type MatchCardProps = {
    matches: DaysMatch;
};

export default function MatchCard({ matches }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);

    useEffect(() => {}, [matches]);

    return (
        <div className='flex justify-between flex-col gap-2' key={matches.match.id}>
            <div className='flex gap-2 font-bold pl-2  text-center items-center'>
                <div className='flex justify-center items-center bg-blue-600 px-1 text-white rounded-[5px] '>
                    <span className='text-base leading-5'>{matches.league?.name}</span>
                </div>
                <span className='text-white'>{KoreanDateFormat(matches.startTime)}</span>
                {!/주 차/.test(matches.blockName) && (
                    <span className='text-white'>{matches.blockName}</span>
                )}
            </div>
            <div className='flex'>
                {matches.match.teams?.map((team, index) => (
                    <TeamPanel
                        key={team.code}
                        match={matches.match}
                        position={index as 0 | 1}
                        matchState={matches.state}
                        matchTime={matches.startTime}
                    />
                ))}
            </div>
        </div>
    );
}
