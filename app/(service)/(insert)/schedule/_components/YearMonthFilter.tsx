"use client";

import React, { useState, useEffect } from "react";
import YearMonthFilterDropdown from "./YearMonthFilterDropdown";

function getYears(startYear: number) {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - startYear + 1 }, (_, i) => ({
        label: `${currentYear - i}`,
        value: `${currentYear - i}`,
    }));
}

const months = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}월`,
    value: `${i + 1}`,
}));

export default function YearMonthFilter() {
    const years = getYears(2022);
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<string>("");

    useEffect(() => {
        const currentYear = new Date().getFullYear().toString();
        const currentMonth = (new Date().getMonth() + 1).toString();
        setSelectedYear(currentYear);
        setSelectedMonth(currentMonth);
    }, []);

    return (
        <div className="flex justify-start bg-gray-800 py-4">
            <YearMonthFilterDropdown
                options={years}
                selectedValue={selectedYear}
                onChange={setSelectedYear}
            />
            <div className="w-4"></div>
            <YearMonthFilterDropdown
                options={months}
                selectedValue={selectedMonth}
                onChange={setSelectedMonth}
            />
        </div>
    );
}
