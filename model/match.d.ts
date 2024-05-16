export interface League {
    name: string;
    slug: string;
}

export interface Result {
    outcome: string | null;
    gameWins: number;
}

export interface record {
    wins: number;
    losses: number;
}

export interface Team {
    name: string;
    code: string;
    image: string;
    result: Result | null;
    record: record | null;
}

export interface Match {
    id: string;
    flags: string[];
    teams: Team[];
    strategy: {
        type: string;
        count: number;
    };
}

export interface Event {
    startTime: string;
    state: string;
    type: string;
    blockName: string;
    league: League;
    match: Match;
}

export interface VersersData {
    schedule: {
        pages: {
            older: string | null;
            newer: string | null;
        };
        events: Event[];
    };
}

export interface Versers {
    data: VersersData;
}
