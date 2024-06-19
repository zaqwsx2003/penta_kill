"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMatchSchedule } from "@/app/api/api";
import { useScheduleStore } from "@/lib/scheduleStore";
import { useEffect } from "react";
import MatchesPerDay from "./MatchesPerDay";

const mockMatchData = {
    "2024-06-01": [
        {
            id: "1",
            startTime: "2024-06-01T15:00:00Z",
            league: { name: "LCS" },
            teams: [
                {
                    name: "Team A",
                    code: "A",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team B",
                    code: "B",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "2",
            startTime: "2024-06-01T17:00:00Z",
            league: { name: "LCK" },
            teams: [
                {
                    name: "Team C",
                    code: "C",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team D",
                    code: "D",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "3",
            startTime: "2024-06-01T19:00:00Z",
            league: { name: "LPL" },
            teams: [
                {
                    name: "Team E",
                    code: "E",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team F",
                    code: "F",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
    ],
    "2024-06-02": [
        {
            id: "4",
            startTime: "2024-06-02T14:00:00Z",
            league: { name: "LCS" },
            teams: [
                {
                    name: "Team G",
                    code: "G",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team H",
                    code: "H",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "5",
            startTime: "2024-06-02T16:00:00Z",
            league: { name: "LCK" },
            teams: [
                {
                    name: "Team I",
                    code: "I",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team J",
                    code: "J",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "6",
            startTime: "2024-06-02T18:00:00Z",
            league: { name: "LPL" },
            teams: [
                {
                    name: "Team K",
                    code: "K",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team L",
                    code: "L",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
    ],
    "2024-06-03": [
        {
            id: "7",
            startTime: "2024-06-03T13:00:00Z",
            league: { name: "LCS" },
            teams: [
                {
                    name: "Team M",
                    code: "M",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team N",
                    code: "N",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "8",
            startTime: "2024-06-03T15:00:00Z",
            league: { name: "LCK" },
            teams: [
                {
                    name: "Team O",
                    code: "O",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team P",
                    code: "P",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "9",
            startTime: "2024-06-03T17:00:00Z",
            league: { name: "LPL" },
            teams: [
                {
                    name: "Team Q",
                    code: "Q",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team R",
                    code: "R",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "10",
            startTime: "2024-06-03T19:00:00Z",
            league: { name: "LCS" },
            teams: [
                {
                    name: "Team S",
                    code: "S",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team T",
                    code: "T",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
    ],
    "2024-06-04": [
        {
            id: "11",
            startTime: "2024-06-04T14:00:00Z",
            league: { name: "LCS" },
            teams: [
                {
                    name: "Team U",
                    code: "U",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team V",
                    code: "V",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "12",
            startTime: "2024-06-04T16:00:00Z",
            league: { name: "LCK" },
            teams: [
                {
                    name: "Team W",
                    code: "W",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team X",
                    code: "X",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "13",
            startTime: "2024-06-04T18:00:00Z",
            league: { name: "LPL" },
            teams: [
                {
                    name: "Team Y",
                    code: "Y",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team Z",
                    code: "Z",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
    ],
    "2024-06-05": [
        {
            id: "14",
            startTime: "2024-06-05T15:00:00Z",
            league: { name: "LCS" },
            teams: [
                {
                    name: "Team AA",
                    code: "AA",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team BB",
                    code: "BB",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "15",
            startTime: "2024-06-05T17:00:00Z",
            league: { name: "LCK" },
            teams: [
                {
                    name: "Team CC",
                    code: "CC",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team DD",
                    code: "DD",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
        {
            id: "16",
            startTime: "2024-06-05T19:00:00Z",
            league: { name: "LPL" },
            teams: [
                {
                    name: "Team EE",
                    code: "EE",
                    image: "https://via.placeholder.com/40",
                },
                {
                    name: "Team FF",
                    code: "FF",
                    image: "https://via.placeholder.com/40",
                },
            ],
        },
    ],
};

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
            fetchMatchSchedule({ page: currentPage, size: pageSize }),
    });

    useEffect(() => {
        if (data) {
            setSchedules(data.data);
            setPageInfo(
                data.currentPage,
                data.totalPage,
                data.pageSize,
                data.totalElements,
            );
            setMatchDates(Object.keys(mockMatchData));
            console.log(data);
        }
    }, [data, setSchedules, setPageInfo, setMatchDates]);

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
                        <div className="rounded-lg bg-white py-1">
                            <MatchesPerDay />
                            <MatchesPerDay />
                            <MatchesPerDay />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
