import { create } from "zustand";
import { ScheduleState } from "@/model/schedule";

export const useScheduleStore = create<ScheduleState>((set) => ({
    schedules: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
    setSchedules: (schedules) => set({ schedules }),
    setPageInfo: (currentPage, totalPages, totalElements, pageSize) =>
        set({
            currentPage,
            totalPages,
            totalElements,
            pageSize,
        }),
}));
