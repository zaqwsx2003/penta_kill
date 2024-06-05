"use client";

import React from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";

import useMatchPanelColor from "@/app/(service)/(landing)/_lib/useMatchPanelColor";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TeamPanel = {
    event: Event;
    position: 0 | 1;
    matchState: string;
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

export default function TeamPanel({ match, position, matchState }: any) {
    const team = match[position];
    const panelColor = useMatchPanelColor(team || matchState || null);

    if (!team) {
        return null;
    }
    return (
        <>
            <div className='w-1/2 '>
                <Card
                    className={`${cn(panelVariants({ position }))}, ${panelColor}
                 `}>
                    <CardContent
                        className={`flex justify-between w-full ${
                            position === 1 ? "flex-row-reverse" : ""
                        }`}>
                        <div className={`flex gap-5 ${position === 1 ? "flex-row-reverse" : ""}`}>
                            <div className='min-w-[60px] min-h-[60px]'>
                                <Image
                                    src={match[position].image}
                                    width={60}
                                    height={60}
                                    alt='team'
                                />
                            </div>
                            <div className='font-bold'>{match[position].code}</div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='bg-gray-800 flex items-center justify-center border rounded-[10px] w-12 h-12'>
                                <div className='text-white text-4xl font-bold'>
                                    {match[position].result?.gameWins}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
