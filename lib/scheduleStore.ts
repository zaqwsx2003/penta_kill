import { create } from "zustand";
import { ScheduleState } from "@/model/schedule";

export const useScheduleStore = create<ScheduleState>((set) => ({
    matchDates: [],
    schedules: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
    selectedYear: new Date().getFullYear().toString(),
    selectedMonth: (new Date().getMonth() + 1).toString(),
    setMatchDates: (matchDates) => set({ matchDates }),
    setSchedules: (schedules) => set({ schedules }),
    setPageInfo: (currentPage, totalPages, totalElements, pageSize) =>
        set({
            currentPage,
            totalPages,
            totalElements,
            pageSize,
        }),
    setSelectedYear: (selectedYear) => set({ selectedYear }),
    setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
}));
