"use client";

import { useScheduleStore } from "@/lib/scheduleStore";
import YearMonthFilterDropdown from "./YearMonthFilterDropdown";

// 데이터 보관 년도 ~ 올 해
function getYears(startYear: number) {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - startYear + 1 }, (_, i) => ({
        label: `${currentYear - i}`,
        value: `${currentYear - i}`,
    }));
}

export default function YearMonthFilter() {
    const {
        selectedYear,
        selectedMonth,
        setSelectedYear,
        setSelectedMonth,
        setCurrentPage,
    } = useScheduleStore();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const years = getYears(2022);
    const months = Array.from({ length: 12 }, (_, i) => ({
        label: `${i + 1}월`,
        value: `${i + 1}`,
    }));

    function yearChangeHandler(year: string) {
        setSelectedYear(year);
        setCurrentPage(0);
        if (
            parseInt(year) === currentYear &&
            parseInt(selectedMonth) > currentMonth
        ) {
            setSelectedMonth(`${currentMonth}`);
        }
    }

    function monthChangeHandler(month: string) {
        setSelectedMonth(month);
        setCurrentPage(0);
    }

    return (
        <div className="flex justify-start">
            <YearMonthFilterDropdown
                options={years}
                selectedValue={selectedYear}
                onChange={yearChangeHandler}
            />
            <div className="w-4"></div>
            <YearMonthFilterDropdown
                options={months}
                selectedValue={selectedMonth}
                onChange={monthChangeHandler}
            />
        </div>
    );
}
