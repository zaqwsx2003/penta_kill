import { create } from "zustand";
import { ScheduleState } from "@/model/schedule";

export const useScheduleStore = create<ScheduleState>((set) => ({
    matchDates: [],
    schedules: {},
    currentPage: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
    selectedYear: new Date().getFullYear().toString(),
    selectedMonth: (new Date().getMonth() + 1).toString(),
    setMatchDates: (matchDates) => set({ matchDates }),
    setSchedules: (newSchedules) =>
        set((state) => ({
            schedules: { ...state.schedules, ...newSchedules },
        })),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setTotalElements: (totalElements) => set({ totalElements }),
    setSelectedYear: (selectedYear) => set({ selectedYear }),
    setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
}));
