"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchMatchSchedule } from "@/app/api/api";
import { useScheduleStore } from "@/lib/scheduleStore";
import { useEffect } from "react";

export default function MatchSchedule() {
    const { schedules, setSchedules, setPageInfo, currentPage, pageSize } =
        useScheduleStore();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["board", currentPage, pageSize],
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
            console.log(data);
        }
    }, [data, setSchedules, setPageInfo]);

    return (
        <div>
            <div className="relative flex items-center justify-center bg-white pr-5">
                히히
            </div>
        </div>
    );
}
