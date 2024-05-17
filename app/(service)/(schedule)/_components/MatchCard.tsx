"use client";

import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import React, { useState } from "react";
import { Event } from "@/model/match";
import TeamPanel from "./TeamPanel";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIncreasePanel } from "../_lib/useIncreasePanel";

type MatchCardProps = {
    event: Event;
};

export default function MatchCard({ event }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const [isHovered, setIsHovered] = useState(false);
    const [isPanelHover, setIsPanelHover] = useState(false);
    const [isChevronVisible, setIsChevronVisible] = useState(false);
    const panel = useIncreasePanel();

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsPanelHover(true);
        setIsChevronVisible(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsPanelHover(false);
        setIsChevronVisible(false);
    };

    const handleChevronClick = (id: string) => () => {
        console.log(id, isOpen);
        if (panel.openPanels[id]) {
            panel.onClose(id);
        } else {
            panel.onOpen(id);
        }
    };

    const isOpen = panel.openPanels[event.match.id] || false;

    return (
        <div className='flex justify-between flex-col gap-2' key={event.match.id}>
            <div className='flex gap-2 font-bold pl-2'>
                <span>{KoreanDateFormat(event.startTime)}</span>
                <span>{event.league.name}</span>
                <span>{event.blockName}</span>
            </div>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleChevronClick(event.match.id)}>
                <div className='flex'>
                    <TeamPanel event={event} position={0} />
                    <TeamPanel event={event} position={1} />
                </div>
                <div
                    className={`rounded-[10px] rounded-t-none w-full duration-300 overflow-hidden transition-max-height ease-out ${
                        isHovered
                            ? "pb-8  bg-gradient-to-b from-white to-gray-200 dark:from-[#020817] dark:to-gray-800"
                            : "pb-0"
                    } ${
                        isOpen
                            ? "min-h-[600px] bg-gradient-to-b from-white to-gray-200 dark:from-[#020817] dark:to-gray-800"
                            : "max-h-0"
                    }`}>
                    <div className={`bottom-0 flex justify-center w-full pt-1`}>
                        {isOpen ? (
                            <ChevronUp />
                        ) : (
                            <ChevronDown className={`${isPanelHover ? "animate-bounce " : ""}`} />
                        )}
                    </div>
                    {isOpen && (
                        <div className='h-full '>
                            ㄴㅇㄹㄴㅇㄴㅇㅁㄹㄴㅇㄹㅁㄴㅁㅇㄹㅁㄴㅇㄹㅁㄴㅁㅇㄴㄹㅁㄴㅇㄹㅁㄴㄹㅁㄴㅇㄹㅁㄴㅇㄹㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㅇㄹㅁㄴㅇㄹㅁㄴㅇㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
