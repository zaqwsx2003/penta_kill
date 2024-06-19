export interface Team {
    name: string;
    code: string;
    image: string;
    result: {
        outcome: string | null;
        gameWins: number;
    };
    record: {
        wins: number;
        losses: number;
    };
}

export interface Match {
    id: string;
    flags: string | null;
    teams: Team[];
    strategy: {
        type: string;
        count: number;
    };
}

export interface Schedule {
    startTime: string;
    state: string;
    type: string;
    blockName: string;
    league: {
        name: string;
        slug: string;
    };
    match: Match;
}

export interface ScheduleResponse {
    statusCode: number;
    message: string;
    data: Schedule[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
}

export interface ScheduleState {
    matchDates: string[];
    schedules: Schedule[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    selectedYear: string;
    selectedMonth: string;
    setMatchDates: (matchDates: string[]) => void;
    setSchedules: (schedules: Schedule[]) => void;
    setPageInfo: (
        currentPage: number,
        totalPages: number,
        totalElements: number,
        pageSize: number,
    ) => void;
    setSelectedYear: (selectedYear: string) => void;
    setSelectedMonth: (selectedMonth: string) => void;
}
