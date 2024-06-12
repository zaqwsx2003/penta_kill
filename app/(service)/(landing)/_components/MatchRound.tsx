"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import MatchCard from "@/app/(service)/(landing)/_components/MatchCard";
import { DaysMatch } from "@/model/match";
import WeekDropDown from "@/app/(service)/(landing)/_components/WeekDropDown";
import { getMatchPredictionList } from "@/app/api/api";

export default function MatchRound() {
    const [currentWeek, setCurrentWeek] = useState<number>(0);

    const {
        data: match,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["match"],
        queryFn: getMatchPredictionList,
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
    const weeklyArrayFiltered = weeklySchedules?.filter(
        (data: any, index: number) => index === currentWeek,
    );

    return (
        <>
            <WeekDropDown currentWeek={currentWeek} weeklyArray={weeklyArray} />
            <div className="flex flex-col gap-y-10">
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
