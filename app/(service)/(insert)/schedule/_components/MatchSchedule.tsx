"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMatchSchedule } from "@/app/api/api";
import { useScheduleStore } from "@/lib/scheduleStore";
import { useEffect } from "react";
import MatchesPerDay from "./MatchesPerDay";
import Spinner from "@/app/(service)/_components/Spinner";

export default function MatchSchedule() {
    const {
        matchDates,
        setMatchDates,
        schedules,
        setSchedules,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        totalElements,
        setTotalElements,
        pageSize,
        selectedYear,
        selectedMonth,
    } = useScheduleStore();

    console.log(
        "Query Params:",
        currentPage,
        pageSize,
        selectedYear,
        selectedMonth,
    );

    const { data, isError, isLoading } = useQuery({
        queryKey: [
            "schedules",
            currentPage,
            pageSize,
            selectedYear,
            selectedMonth,
        ],
        queryFn: () =>
            fetchMatchSchedule({
                page: currentPage,
                size: pageSize,
                year: Number(selectedYear),
                month: Number(selectedMonth),
            }),
    });

    useEffect(() => {
        if (data && data.data) {
            const dates = Object.keys(data.data);
            setMatchDates(dates);
            setSchedules(data.data);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            console.log("matchDates: " + dates);
        }
    }, [
        data,
        setMatchDates,
        setSchedules,
        setCurrentPage,
        setTotalPages,
        setTotalElements,
    ]);

    return (
        <div>
            <div className="bg-white">
                {isLoading && (
                    <div className="text-center">
                        <Spinner />
                    </div>
                )}
                {isError && (
                    <div className="text-center text-red-500">
                        잠시 후 다시 시도해주십시오.
                    </div>
                )}
                {matchDates.map((date) => (
                    <div
                        key={date}
                        className="mb-4 rounded-lg bg-gray-800 p-4 shadow"
                    >
                        <h3 className="mb-2 text-lg font-bold text-gray-400">
                            {new Date(date)
                                .toLocaleDateString("ko-KR", {
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit",
                                    weekday: "short",
                                })
                                .replace(/\. \(|\)/g, " ")}
                        </h3>
                        <div className="rounded-lg bg-white py-1">
                            {schedules[date]?.map((match) => (
                                <MatchesPerDay
                                    key={match.matchId}
                                    match={match}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
