"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMatchSchedule } from "@/app/api/api";
import { useScheduleStore } from "@/lib/scheduleStore";
import { useEffect, useRef, useCallback } from "react";
import MatchesPerDay from "./MatchesPerDay";
import Spinner from "@/app/(service)/_components/Spinner";

export default function MatchSchedule() {
    const {
        matchDates,
        setMatchDates,
        schedules,
        setSchedules,
        addMoreSchedules,
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

    const observerRef = useRef<HTMLDivElement>(null);

    const { data, isError, isLoading, isFetching } = useQuery({
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
            addMoreSchedules(data.data);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            console.log("matchDates: " + dates);
        }
    }, [
        data,
        setMatchDates,
        addMoreSchedules,
        setTotalPages,
        setTotalElements,
    ]);

    const loadMoreHandler = useCallback(() => {
        if (!isLoading && !isFetching && currentPage < totalPages - 1) {
            console.log("Loading more data...");
            setCurrentPage(currentPage + 1);
        }
    }, [isLoading, isFetching, currentPage, totalPages, setCurrentPage]);

    useEffect(() => {
        const currentObserverRef = observerRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log("Intersection observed");
                    loadMoreHandler();
                }
            },
            { threshold: 0.1 },
        );

        if (currentObserverRef) {
            console.log("Observer is observing:", currentObserverRef);

            observer.observe(currentObserverRef);
        }

        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [loadMoreHandler]);

    return (
        <div>
            {(isLoading || (isFetching && matchDates.length === 0)) && (
                <div className="text-center">
                    <Spinner />
                </div>
            )}
            {isError && (
                <div className="text-center text-red-500">
                    잠시 후 다시 시도해주십시오.
                </div>
            )}
            {!isLoading && matchDates.length === 0 && (
                <div className="text-center text-gray-500">
                    경기 일정이 없습니다.
                </div>
            )}
            {matchDates.map((date) => (
                <div
                    key={date}
                    className="mb-6 overflow-hidden rounded-[10px] bg-card"
                >
                    <h3 className="p-4 text-lg font-bold text-gray-300">
                        {new Date(date)
                            .toLocaleDateString("ko-KR", {
                                year: "2-digit",
                                month: "2-digit",
                                day: "2-digit",
                                weekday: "short",
                            })
                            .replace(/\. \(|\)/g, " ")}
                    </h3>
                    {schedules[date]?.map((match) => (
                        <MatchesPerDay key={match.match.id} match={match} />
                    ))}
                </div>
            ))}
            <div ref={observerRef} className="h-10"></div>
        </div>
    );
}
