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
    `relative flex items-center border-none rounded-[10px]
 px-5 py-3 `,
    {
        variants: {
            position: {
                0: `rounded-r-none justify-start`,
                1: `rounded-l-none justify-end`,
            },
        },
    }
);

export default function TeamPanel({ event, position }: TeamPanel) {
    const team = event.match?.teams[position];
    const panelColor = useMatchPanelColor(team?.result || null);

    if (!team) {
        return null;
    }
    return (
        <>
            <div className='w-1/2'>
                <Card className={`${cn(panelVariants({ position }))} ${panelColor}`}>
                    <CardContent className='flex items-center '>
                        <div className='flex gap-5'>
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
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
