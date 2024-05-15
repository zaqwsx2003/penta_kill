"use client";

import useKoreanDateFormat from "@/app/_lib/useDate";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Event, Result } from "@/model/match";

type MatchCardProps = {
    event: Event;
};

export default function MatchCard({ event }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);

    const getPanelColor = (teamResult: Result | null) => {
        if (!teamResult || teamResult.outcome === null) {
            return "bg-gray-200";
        }

        return teamResult.outcome === "win" ? "bg-green-500" : "bg-red-500";
    };

    const winPanel_1 = getPanelColor(event.match.teams[0].result);
    const winPanel_2 = getPanelColor(event.match.teams[1].result);

    return (
        <div className='flex justify-between flex-col gap-2' key={event.match.id}>
            <div className='flex'>
                <div>{KoreanDateFormat(event.startTime)}</div>
                <div>{event.league.name}</div>
                <div>{event.type}</div>
                <div>{event.blockName}</div>
            </div>
            <div className='flex'>
                <div className='w-1/2'>
                    <Card
                        className={`relative flex items-center justify-start border-r-0 rounded-r-none px-5 py-3 min-h-[86px] ${winPanel_1}`}>
                        <CardContent className='flex items-center '>
                            <div className='flex gap-5'>
                                <div className='max-w-[60px] max-h-[60px]'>
                                    <Image
                                        src={event.match.teams[0].image}
                                        width={60}
                                        height={60}
                                        alt='team'
                                    />
                                </div>
                                <div className='font-bold'>{event.match.teams[0].code}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className='w-1/2'>
                    <Card
                        className={`relative flex items-center justify-end border-l-0 rounded-l-none px-5 py-3  min-h-[86px] ${winPanel_2}`}>
                        <CardContent className='flex items-center'>
                            <div className='flex gap-5'>
                                <div className='font-bold'>{event.match.teams[1].code}</div>
                                <div className='max-w-[60px] max-h-[60px]'>
                                    <Image
                                        src={event.match.teams[1].image}
                                        width={60}
                                        height={60}
                                        alt='team'
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
