"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMatchSchedule } from "@/app/api/api";
import { useScheduleStore } from "@/lib/scheduleStore";
import { useEffect } from "react";
import MatchesPerDay from "./MatchesPerDay";
import { DatabaseIcon } from "lucide-react";

export default function MatchSchedule() {
    const {
        matchDates,
        setMatchDates,
        schedules,
        setSchedules,
        setPageInfo,
        currentPage,
        pageSize,
        selectedYear,
        selectedMonth,
    } = useScheduleStore();

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
        if (data) {
            const dates = Object.keys(data.data);
            setMatchDates(dates);
            console.log("matchDates: " + dates);
        }
    }, [data, setMatchDates]);

    return (
        <div>
            <div className="bg-white">
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
                        {/* <div className="rounded-lg bg-white py-1">
                            <MatchesPerDay />
                            <MatchesPerDay />
                            <MatchesPerDay />
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
}
