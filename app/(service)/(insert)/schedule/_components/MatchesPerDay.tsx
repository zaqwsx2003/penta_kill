import Image from "next/image";
import { Match } from "@/model/schedule";

interface MatchesPerDayProps {
    match: Match;
}

export default function MatchesPerDay({ match }: MatchesPerDayProps) {
    return (
        <div className="mt-1 flex items-center justify-between bg-zinc-800 px-4 py-2 text-white">
            {/* Time & Status */}
            <div className="mr-4 flex items-center">
                <span className="mr-2">
                    {new Date(match.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </span>
                {match.state === "completed" ? (
                    <span className="rounded bg-gray-600 px-2 py-1 text-sm">
                        경기 종료
                    </span>
                ) : (
                    <span className="w-[70px]"></span>
                )}
            </div>
            <div className="flex items-center">
                {/* Team 1 */}
                <div className="flex w-32 items-center justify-end">
                    <span className="mr-3">{match.team1Code}</span>
                    <Image
                        src={match.team1Image}
                        alt={match.team1Name}
                        width={50}
                        height={50}
                    />
                </div>
                {/* Score */}
                <div className="mx-4 flex h-14 w-24 items-center justify-center rounded-[5px] bg-card text-center">
                    {match.state === "completed" ? (
                        <>
                            <span className="p-4">{match.team1GameWins}</span>
                            <span className="h-12 w-[2px] bg-zinc-800"></span>
                            <span className="p-4">{match.team2GameWins}</span>
                        </>
                    ) : (
                        "vs"
                    )}
                </div>
                {/* Team 2 */}
                <div className="flex w-32 items-center justify-start">
                    <Image
                        src={match.team2Image}
                        alt={match.team2Name}
                        width={50}
                        height={50}
                    />
                    <span className="ml-3">{match.team2Code}</span>
                </div>
            </div>

            {/* League */}
            <div className="pr-10">{match.leagueName}</div>
        </div>
    );
}
