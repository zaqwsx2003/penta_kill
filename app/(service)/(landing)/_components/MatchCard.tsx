"use client";

import React, { memo, useEffect, useState } from "react";
import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import TeamPanel from "@/app/(service)/(landing)/_components/TeamPanel";
import { DaysMatch } from "@/model/match";
import { useSelectedTeam } from "@/lib/gameSelectStore";

type MatchCardProps = {
    matches: DaysMatch;
};

export default function MatchCard({ matches }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const { setGameSelection, game } = useSelectedTeam();
    const [selectedTeams, setSelectedTeams] = useState<{ [teamCode: string]: boolean }>({});

    const toggleTeamSelection = (teamCode: string) => {
        const newSelectedState = !selectedTeams[teamCode];
        setSelectedTeams((prev) => ({
            ...prev,
            [teamCode]: newSelectedState,
        }));
        setGameSelection(matches.match.id, teamCode, newSelectedState);
    };

    const TeamPanelMemoized = memo(TeamPanel);

    useEffect(() => {
        console.log(game);
    }, [matches, game]);

    return (
        <div className='flex justify-between flex-col gap-2' key={matches.match.id}>
            <div className='flex gap-2 font-bold pl-2  text-center items-center'>
                <div className='flex justify-center items-center bg-blue-600 px-1 rounded-[5px] '>
                    <span className='text-base leading-5'>{matches.league?.name}</span>
                </div>
                <span>{KoreanDateFormat(matches.startTime)}</span>
                {!/주 차/.test(matches.blockName) && <span>{matches.blockName}</span>}
            </div>
            <div className='flex'>
                {matches.match.teams?.map((team, index) => (
                    <TeamPanelMemoized
                        key={team.code}
                        onClick={() => toggleTeamSelection(team.code)}
                        isSelected={selectedTeams[team.code] ?? false}
                        match={matches.match.teams}
                        position={index}
                        matchState={matches.state}
                    />
                ))}
            </div>
        </div>
    );
}
