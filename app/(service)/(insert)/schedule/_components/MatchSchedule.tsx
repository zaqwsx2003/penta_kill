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
        addMoreSchedules,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        setTotalElements,
        pageSize,
        selectedYear,
        selectedMonth,
        showScrollToTop,
        setShowScrollToTop,
    } = useScheduleStore();

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
            setMatchDates(dates, false);
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
            setCurrentPage(currentPage + 1);
        } else if (currentPage >= totalPages - 1) {
            setShowScrollToTop(true);
        }
    }, [
        isLoading,
        isFetching,
        currentPage,
        totalPages,
        setCurrentPage,
        setShowScrollToTop,
    ]);

    useEffect(() => {
        const currentObserverRef = observerRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreHandler();
                }
            },
            { threshold: 0.1 },
        );
        if (currentObserverRef) {
            observer.observe(currentObserverRef);
        }
        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [loadMoreHandler]);

    function scrollToTopHandler() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="mx-auto w-full">
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
            <div ref={observerRef} className="h-1"></div>
            {showScrollToTop && (
                <button
                    onClick={scrollToTopHandler}
                    className="flex h-10 w-full items-center justify-center rounded-[10px] bg-zinc-800 text-center text-white hover:bg-zinc-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-up"
                    >
                        <path d="m5 12 7-7 7 7" />
                        <path d="M12 19V5" />
                    </svg>
                </button>
            )}
        </div>
    );
}
