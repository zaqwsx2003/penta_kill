"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cva } from "class-variance-authority";

import MatchCard from "@/app/(service)/(landing)/_components/MatchCard";
import instance from "@/app/api/instance";
import { cn } from "@/lib/utils";
import { DaysMatch } from "@/model/match";

const matchWeekVariant = cva(
    `flex justify-center items-center w-32 h-20 border border-white rounded-[10px] overflow-hidden cursor-pointer`,
    {
        variants: {
            selectWeek: { true: `bg-blue-500`, false: "" },
        },
    }
);

export default function MatchRound() {
    const [currentWeek, setCurrentWeek] = useState<number>(0);

    const {
        data: match,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["match"],
        queryFn: async () => {
            const response = await instance.get("/bets/recentTournament/schedules");
            return response.data;
        },
    });

    useEffect(() => {
        if (match?.data) {
            setCurrentWeek(match.data.currentWeek);
        }
    }, [match]);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    const weeklySchedules = match?.data?.weeklySchedules;
    const weeklyArray = Array.from({ length: weeklySchedules?.length || 0 });
    const weeklyArrayFiltered = weeklySchedules.filter(
        (data: any, index: number) => index === currentWeek
    );

    return (
        <>
            <div className='flex flex-row gap-x-10 gap-y-10 justify-center items-center flex-wrap'>
                {weeklyArray.map((_, index: number) => (
                    <div
                        className={cn(matchWeekVariant({ selectWeek: currentWeek === index }))}
                        key={index}
                        onClick={() => setCurrentWeek(index)}>
                        {index + 1}주차
                    </div>
                ))}
            </div>
            <div className='flex flex-col gap-y-10'>
                {weeklyArrayFiltered.map((event: any, index: number) => (
                    <Fragment key={index}>
                        {event.map((match: DaysMatch, index: number) => (
                            <MatchCard key={index} matches={match} />
                        ))}
                    </Fragment>
                ))}
            </div>
        </>
    );
}
