import Image from "next/image";
import { Match } from "@/model/schedule";

interface MatchesPerDayProps {
    match: Match;
}

export default function MatchesPerDay({ match }: MatchesPerDayProps) {
    return (
        <div className="mb-2 flex items-center justify-between rounded-md bg-gray-800 p-4 shadow">
            {/* Time & Status */}
            <div className="flex items-center space-x-2">
                <span className="text-white">
                    {new Date(match.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
                <span className="rounded bg-gray-600 px-2 py-1 text-sm text-white">
                    {match.state}
                </span>
            </div>

            {/* Team 1 */}
            <div className="flex items-center space-x-2">
                <Image
                    src={match.team1Image}
                    alt={match.team1Name}
                    width={32}
                    height={32}
                />
                <span className="text-white">{match.team1Code}</span>
            </div>

            {/* Score */}
            <div className="flex items-center space-x-1 text-white">
                <span>{match.team1GameWins}</span>
                <span>-</span>
                <span>{match.team2GameWins}</span>
            </div>

            {/* Team 2 */}
            <div className="flex items-center space-x-2">
                <span className="text-white">{match.team2Code}</span>
                <Image
                    src={match.team2Image}
                    alt={match.team2Name}
                    width={32}
                    height={32}
                />
            </div>

            {/* League */}
            <div className="flex items-center space-x-2">
                <span className="text-white">{match.leagueName}</span>
                <span className="text-gray-400">
                    {match.leagueSlug.toUpperCase()}
                </span>
            </div>
        </div>
    );
}
