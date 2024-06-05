"use client";

import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import React, { useState } from "react";
// import { Event } from "@/model/match";
import TeamPanel from "@/app/(service)/(landing)/_components/TeamPanel";
import { useIncreasePanel } from "@/app/(service)/(landing)/_lib/useIncreasePanel";
import { DaysMatch } from "@/model/Match";

type MatchCardProps = {
    matches: DaysMatch;
}

export default function MatchCard({ matches }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const [isHovered, setIsHovered] = useState(false);
    const [isPanelHover, setIsPanelHover] = useState(false);
    const [isChevronVisible, setIsChevronVisible] = useState(false);
    const panel = useIncreasePanel();

    const handleMouseEnter = () => {
        if (!outcomeNull) {
            setIsHovered(true);
            setIsPanelHover(true);
            setIsChevronVisible(true);
        }
    };

    const handleMouseLeave = () => {
        if (!outcomeNull) {
            setIsHovered(false);
            setIsPanelHover(false);
            setIsChevronVisible(false);
        }
    };

    const handleChevronClick = (id: string) => () => {
        if (!outcomeNull) {
            if (panel.openPanels[id]) {
                panel.onClose(id);
            } else {
                panel.onOpen(id);
            }
        }
    };

    const outcomeNull = matches?.match?.teams?.some(
        (team: any) => team.result === null || team.result.outcome === null
    );

    const isOpen = (!outcomeNull && panel.openPanels[matches.match.id]) || false;

    return (
        <div className='flex justify-between flex-col gap-2' key={matches.match.id}>
            <div className='flex gap-2 font-bold pl-2'>
                <span>{KoreanDateFormat(matches.startTime)}</span>
                <span>{matches.league?.name}</span>
                <span>{matches.blockName}</span>
            </div>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleChevronClick(matches.match.id)}>
                <div className='flex'>
                    <TeamPanel match={matches.match.teams} position={0} />
                    <TeamPanel match={matches.match.teams} position={1} />
                </div>
            </div>
        </div>
    );
}