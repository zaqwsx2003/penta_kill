"use client";

import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import React, { useState } from "react";
import { Event } from "@/model/match";
import TeamPanel from "./TeamPanel";
import { ChevronDown } from "lucide-react";

type MatchCardProps = {
    event: Event;
};

export default function MatchCard({ event }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const [isHovered, setIsHovered] = useState(false);
    const [isChevronVisible, setIsChevronVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsChevronVisible(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsChevronVisible(false);
    };

    return (
        <div className='flex justify-between flex-col gap-2' key={event.match.id}>
            <div className='flex gap-2 font-bold'>
                <span>{KoreanDateFormat(event.startTime)}</span>
                <span>{event.league.name}</span>
                {/* <span>{event.type}</span> */}
                <span>{event.blockName}</span>
            </div>
            <div
                className={`bg-gray-800 rounded-[25px] transition-all duration-300 ${
                    isHovered ? "bg-gray-700" : ""
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className='flex'>
                    <TeamPanel event={event} position={0} />
                    <TeamPanel event={event} position={1} />
                </div>
                {isHovered && (
                    <div className={`flex justify-center transition-all duration-300 z-50`}>
                        <ChevronDown />
                    </div>
                )}
            </div>
        </div>
    );
}
