export interface WeekMatches {
    data: DaysMatch[];
}

export interface DaysMatch {
    blockName: string;
    league: MatchLeague;
    match: MatchDetails;
    startTime: string;
    state: string;
    type: string;
}

export interface MatchLeague {
    name: string;
    slug: string;
}

export interface MatchDetails {
    id: string;
    strategy?: MatchStrategy;
    teams: MatchTeams[];
    startTime?: Date | string;
    state?: string;
    type?: string;
    teamCode: string | null;
    status: null | "unstarted" | "inprogress" | "win" | "loss";
    betting: boolean;
    amount: number;
}

export interface MatchStrategy {
    count: number;
    type: string;
}

export interface MatchTeams {
    code: string;
    image: string;
    name: string;
    ratio: number;
    record: MatchRecord;
    result: MatchResult;
}

export interface MatchRecord {
    wins: number;
    losses: number;
}

export interface MatchResult {
    gameWins: number;
    outcome: string | null;
}
