"use client";

import React from "react";

import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import TeamPanel from "@/app/(service)/(landing)/_components/TeamPanel";
import { DaysMatch } from "@/model/match";
import { useSelectedTeam } from "@/lib/gameSelectStore";

type MatchCardProps = {
    matches: DaysMatch;
};

export default function MatchCard({ matches }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const selectedTeam = useSelectedTeam((state) => state.setSelected);

    const outcomeNull = matches?.match?.teams?.some(
        (team: any) => team.result === null || team.result.outcome === null
    );

    const shouldHideBlockName = /주 차/.test(matches.blockName);

    const teamId = matches.match.id;
    const teamCode = matches.match.teams[0].code;

    const selectTeamHandler = (teamId: string, teamCode: string) => {};

    console.log("matches", matches);

    return (
        <div className='flex justify-between flex-col gap-2' key={matches.match.id}>
            <div className='flex gap-2 font-bold pl-2'>
                <div className='bg-blue-600 px-1 rounded-[5px]'>
                    <span>{matches.league?.name}</span>
                </div>
                <span>{KoreanDateFormat(matches.startTime)}</span>
                {!shouldHideBlockName && <span>{matches.blockName}</span>}
            </div>
            <div>
                <div className='flex'>
                    <TeamPanel
                        onClick={selectTeamHandler(teamId, teamCode)}
                        match={matches.match.teams}
                        position={0}
                        matchState={matches.state}
                    />
                    <TeamPanel
                        onClick={selectTeamHandler(teamId, teamCode)}
                        match={matches.match.teams}
                        position={1}
                        matchState={matches.state}
                    />
                </div>
            </div>
        </div>
    );
}
