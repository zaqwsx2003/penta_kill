"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import useMatchPanelColor from "../_lib/useMatchPanelColor";
import { Event } from "@/model/match";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TeamPanel = {
    event: Event;
    position: 0 | 1;
};

const panelVariants = cva(
    `relative flex items-center light:border-none rounded-[10px] dark:border-gray-800
 px-5 py-3 `,
    {
        variants: {
            position: {
                0: `rounded-r-none border-r-0 justify-start`,
                1: `rounded-l-none border-l-0 justify-end`,
            },
        },
    }
);

export default function TeamPanel({ event, position }: TeamPanel) {
    const team = event.match?.teams[position];
    // const panelColor = useMatchPanelColor(team?.result || null);  ${panelColor}

    if (!team) {
        return null;
    }
    return (
        <>
            <div className='w-1/2 '>
                <Card
                    className={`${cn(panelVariants({ position }))}

                 `}>
                    <CardContent
                        className={`flex justify-between w-full ${
                            position === 1 ? "flex-row-reverse" : ""
                        }`}>
                        <div className={`flex gap-5 ${position === 1 ? "flex-row-reverse" : ""}`}>
                            <div className='min-w-[60px] min-h-[60px]'>
                                <Image
                                    src={event.match.teams[position].image}
                                    width={60}
                                    height={60}
                                    alt='team'
                                />
                            </div>
                            <div className='font-bold'>{event.match.teams[position].code}</div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='bg-gray-800 flex items-center justify-center border rounded-[10px] w-12 h-12'>
                                <div className='text-white text-4xl font-bold'>
                                    {event.match.teams[position].result?.gameWins}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
