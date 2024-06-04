"use client";

import React from "react";
import MatchCard from "@/app/(service)/(landing)/_components/MatchCard";
import { versers } from "@/dummy";
import { useQuery } from "@tanstack/react-query";
import instance from "@/app/api/instance";

export default function MatchRound() {
    const match = versers.data.schedule.events;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["match"],
        queryFn: async () => {
            const response = await instance.get("/bets/recentTournament/schedules");
            return response.data;
        },
    });

    console.log(data);

    return (
        <>
            {match.map((event, index) => (
                <>
                    <MatchCard event={event} key={index} />
                </>
            ))}
        </>
    );
}
