import { MatchTeams } from "@/model/match";

type PanelColorProps = {
    team: MatchTeams;
    matchState: string | null;
    chooseTeam: string | null;
    betResult: null | "unstarted" | "inProgress" | "win" | "loss";
    isBetting: boolean | null;
    position: 0 | 1;
};

export default function usePanelColor({
    team,
    matchState,
    chooseTeam,
    betResult,
    isBetting,
    position,
}: PanelColorProps) {
    const isWin = team.result?.outcome === "win";
    const isLoss = team.result?.outcome === "loss";

    if (team?.code === "TBD" && matchState === "unstarted") {
        return "bg-gray-900 opacity-[0.2]";
    }

    if (matchState === "unstarted") {
        if (isBetting) {
            if (chooseTeam === team.code) {
                return "bg-blue-500 border-blue-500 border-4";
            } else if (chooseTeam !== team.code) {
                return "bg-gray-900 border-gray-500 border-4 ";
            }
        }
    }

    if (matchState === "inProgress") {
        if (!isBetting) {
            return `border-4 border-gray-500 opacity-[0.2] ${position === 0 ? "rounded-r-none border-r-0" : "rounded-l-none border-l-0"}`;
        } else if (isBetting) {
            if (chooseTeam === team.code) {
                return "bg-blue-500 border-blue-500 border-4";
            } else if (chooseTeam !== team.code) {
                return "bg-gray-900 border-gray-500 border-4 ";
            }
        }
    }

    if (matchState === "completed") {
        if (isBetting) {
            if (chooseTeam === team.code) {
                if (betResult === "win" && isWin) {
                    return "bg-blue-500 border-blue-500 border-4 opacity-[0.2]";
                } else if (betResult === "loss" && isLoss) {
                    return "bg-gray-500 border-gray-500 border-4 opacity-[0.2]";
                }
            } else if (chooseTeam !== team.code) {
                if (betResult === "win" && isLoss) {
                    return "bg-gray-900 border-4 border-blue-500 opacity-[0.2] ";
                } else if (betResult === "loss" && isWin) {
                    return "bg-diagonal-stripes border-gray-500 border-10 opacity-[0.2] border-4 ";
                }
            }
        } else if (!isBetting && !chooseTeam) {
            if (isWin) {
                return "bg-gray-500 border-gray-500 border-4 opacity-[0.2]";
            } else if (isLoss) {
                return "border-gray-500 border-4 opacity-[0.2]";
            }
        }
    }
}
