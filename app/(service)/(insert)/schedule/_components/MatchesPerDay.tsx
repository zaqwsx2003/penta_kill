import Image from "next/image";
import { Match } from "@/model/schedule";
import { ImageLoaderProps } from "@/model/match";

interface MatchesPerDayProps {
    match: Match;
}

export default function MatchesPerDay({ match }: MatchesPerDayProps) {
    const team1 = match.match.teams[0];
    const team2 = match.match.teams[1];

    const teamImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };

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
                    <span className="mr-3">{team1.code}</span>
                    <Image
                        loader={teamImageLoader}
                        src={team1.image}
                        alt={team1.name}
                        width={50}
                        height={50}
                    />
                </div>
                {/* Score */}
                <div className="mx-4 flex h-14 w-24 items-center justify-center rounded-[5px] bg-card text-center">
                    {match.state === "completed" ? (
                        <>
                            <span className="p-4">{team1.result.gameWins}</span>
                            <span className="h-12 w-[2px] bg-zinc-800"></span>
                            <span className="p-4">{team2.result.gameWins}</span>
                        </>
                    ) : (
                        "vs"
                    )}
                </div>
                {/* Team 2 */}
                <div className="flex w-32 items-center justify-start">
                    <Image
                        loader={teamImageLoader}
                        src={team2.image}
                        alt={team2.name}
                        width={50}
                        height={50}
                    />
                    <span className="ml-3">{team2.code}</span>
                </div>
            </div>

            {/* League */}
            <div className="pr-10">{match.league.name}</div>
        </div>
    );
}
