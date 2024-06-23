export interface Match {
    startTime: string;
    state: string;
    type: string;
    blockName: string;
    leagueName: string;
    leagueSlug: string;
    matchId: string;
    team1Name: string;
    team1Code: string;
    team1Image: string;
    team1Outcome: string;
    team1GameWins: number;
    team1RecordWins: number;
    team1RecordLosses: number;
    team2Name: string;
    team2Code: string;
    team2Image: string;
    team2Outcome: string;
    team2GameWins: number;
    team2RecordWins: number;
    team2RecordLosses: number;
    matchStrategyType: string;
    matchStrategyCount: number;
    pointLogList: any[];
    probability: any;
}

export interface ScheduleResponse {
    statusCode: number;
    message: string;
    data: Record<string, Match[]>;
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
}
