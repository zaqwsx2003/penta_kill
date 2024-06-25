import { create } from "zustand";
import { ScheduleState, Match } from "@/model/schedule";

export const useScheduleStore = create<ScheduleState>((set) => ({
    matchDates: [],
    schedules: {},
    currentPage: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
    selectedYear: new Date().getFullYear().toString(),
    selectedMonth: (new Date().getMonth() + 1).toString(),
    setMatchDates: (matchDates, reset = true) =>
        set((state) => ({
            matchDates: reset
                ? matchDates
                : Array.from(new Set([...state.matchDates, ...matchDates])), // Array로 변환하여 사용
        })),
    setSchedules: (newSchedules) =>
        set((state) => ({
            schedules: { ...state.schedules, ...newSchedules },
        })),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setTotalElements: (totalElements) => set({ totalElements }),
    setSelectedYear: (selectedYear) => set({ selectedYear }),
    setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
    addMoreSchedules: (newSchedules) =>
        set((state) => ({
            schedules: {
                ...state.schedules,
                ...Object.entries(newSchedules).reduce(
                    (acc, [key, value]) => ({
                        ...acc,
                        [key]: (state.schedules[key] || []).concat(
                            value as Match[],
                        ),
                    }),
                    {},
                ),
            },
        })),
}));
