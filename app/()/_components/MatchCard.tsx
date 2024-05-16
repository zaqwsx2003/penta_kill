"use client";

import useKoreanDateFormat from "@/app/()/_lib/useDate";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Event, Result } from "@/model/match";
import useMatchPanelColor from "../_lib/useMatchPanelColor";

type MatchCardProps = {
    event: Event;
};

export default function MatchCard({ event }: MatchCardProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);

    const winPanel_1 = useMatchPanelColor(event.match.teams[0].result);
    const winPanel_2 = useMatchPanelColor(event.match.teams[1].result);

    return (
        <div className='flex justify-between flex-col gap-2' key={event.match.id}>
            <div className='flex gap-2 font-bold'>
                <span>{KoreanDateFormat(event.startTime)}</span>
                <span>{event.league.name}</span>
                {/* <span>{event.type}</span> */}
                <span>{event.blockName}</span>
            </div>
            <div className='flex'>
                <div className='w-1/2'>
                    <Card
                        className={`relative flex items-center justify-start rounded-[25px]
                         border-r-0 rounded-r-none px-5 py-3 min-h-[86px] ${winPanel_1}`}>
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
                        className={`relative flex items-center justify-end rounded-[25px] border-l-0 rounded-l-none px-5 py-3  min-h-[86px] ${winPanel_2}`}>
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
