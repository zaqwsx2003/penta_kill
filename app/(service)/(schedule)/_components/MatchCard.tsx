"use client";

import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import React from "react";
import { Event } from "@/model/match";
import TeamPanel from "./TeamPanel";

type MatchCardProps = {
    event: Event;
};

export default function MatchCard({ event }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);

    return (
        <div className='flex justify-between flex-col gap-2' key={event.match.id}>
            <div className='flex gap-2 font-bold'>
                <span>{KoreanDateFormat(event.startTime)}</span>
                <span>{event.league.name}</span>
                {/* <span>{event.type}</span> */}
                <span>{event.blockName}</span>
            </div>
            <div className='flex'>
                <TeamPanel event={event} position={0} />
                <TeamPanel event={event} position={1} />
            </div>
        </div>
    );
}
