// schedule.d.ts

export interface Match {
    startTime: string;
    state: string;
    type: string;
    blockName: string;
    league: {
        name: string;
        slug: string;
    };
    match: {
        id: string;
        flags: any;
        teams: Team[];
        strategy: {
            type: string;
            count: number;
        };
    };
}

export interface Team {
    name: string;
    code: string;
    image: string;
    result: {
        outcome: string;
        gameWins: number;
    };
    record: {
        wins: number;
        losses: number;
    };
}

export interface ScheduleResponse {
    statusCode: number;
    message: string;
    data: Record<string, Match[]>;
    year: number;
    month: number;
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
}

export interface ScheduleState {
    matchDates: string[];
    schedules: Record<string, Match[]>;
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    selectedYear: string;
    selectedMonth: string;
    setMatchDates: (matchDates: string[]) => void;
    setSchedules: (schedules: Record<string, Match[]>) => void;
    setCurrentPage: (currentPage: number) => void;
    setTotalPages: (totalPages: number) => void;
    setTotalElements: (totalElements: number) => void;
    setSelectedYear: (selectedYear: string) => void;
    setSelectedMonth: (selectedMonth: string) => void;
    addMoreSchedules: (schedules: Record<string, Match[]>) => void;
}
