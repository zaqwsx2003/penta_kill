"use client";

import React, { memo, useEffect, useState } from "react";
import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import TeamPanel from "@/app/(service)/(landing)/_components/TeamPanel";
import { DaysMatch } from "@/model/match";

type MatchCardProps = {
    matches: DaysMatch;
};

export default function MatchCard({ matches }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const [activeModalTeam, setActiveModalTeam] = useState<{
        matchId: string;
        teamCode: string | null;
    }>({ matchId: "", teamCode: null });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const modalOpen = (matchId: string, teamCode: string) => {
        if (activeModalTeam.matchId === matchId && activeModalTeam.teamCode === teamCode) {
            setIsModalOpen(false);
            setActiveModalTeam({ matchId: "", teamCode: null });
        } else {
            setIsModalOpen(true);
            setActiveModalTeam({ matchId, teamCode });
        }
    };

    const TeamPanelMemoized = memo(TeamPanel);

    useEffect(() => {
    }, [matches]);

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
                    <TeamPanelMemoized
                        key={team.code}
                        match={matches.match}
                        position={index as 0 | 1}
                        matchState={matches.state}
                        onClick={() => modalOpen(matches.match.id, team.code)}
                        isModalOpen={
                            isModalOpen &&
                            activeModalTeam.matchId === matches.match.id &&
                            activeModalTeam.teamCode === team.code
                        }
                        matchTime={matches.startTime}
                    />
                ))}
            </div>
        </div>
    );
}
