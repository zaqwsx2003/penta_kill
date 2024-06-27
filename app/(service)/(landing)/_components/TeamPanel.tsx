"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

import { ImageLoaderProps, MatchDetails } from "@/model/match";
import { cn } from "@/lib/utils";
import { useMatchState } from "@/lib/matchStore";
import { useTeamState } from "@/lib/teamStore";
import { useBettingModalState } from "@/lib/bettingModalStore";
import { useRefreshToken } from "@/lib/axiosHooks/useRefreshToken";
import { Card, CardContent } from "@/components/ui/card";
import useMatchPanelColor from "@/app/(service)/(landing)/_lib/useMatchPanelColor";
import BettingModal from "@/app/(service)/(landing)/_components/BettingModal";
import SessionModal from "@/app/(service)/(landing)/_components/SessionModal";
import { panelVariants } from "@/app/(service)/(landing)/_components/style";

type TeamPanelProps = {
    match: MatchDetails;
    position: 0 | 1;
    matchTime: string;
    matchState: string;
};

export default function TeamPanel({
    match,
    position,
    matchTime,
    matchState,
}: TeamPanelProps) {
    const { data: session } = useSession();
    const { bettingIsOpen, matchId, teamCode, BettingOnOpen, BettingOnClose } =
        useBettingModalState();
    const [sessionModal, setSessionModal] = useState<boolean>(false);
    const team = match.teams[position];
    const chooseTeam = match.teamCode;
    const betResult = match.status;
    const isBetting = match.betting;
    const panelColor = useMatchPanelColor({
        team,
        matchState,
        chooseTeam,
        betResult,
        isBetting,
        position,
    });
    const refreshToken = useRefreshToken();
    const setTeamData = useTeamState((state) => state.setTeamData);
    const setMatchData = useMatchState((state) => state.setMatchData);

    if (!team) {
        return null;
    }

    const handleOpenModal = async () => {
        if (team.code === "TBD") {
            return;
        }
        if (!session) {
            setSessionModal(true);
        } else if (matchId === match.id && teamCode === team.code) {
            await refreshToken();
            BettingOnOpen(match.id, team.code);
        } else {
            setTeamData({ ...team, position });
            const matchData = {
                ...match,
                matchState,
                startTime: new Date(matchTime).toISOString(),
            };
            setMatchData(matchData);
            await refreshToken();
            BettingOnOpen(match.id, team.code);
        }
    };

    const teamImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return `${team.image}?w=${width}&q=${quality || 75}`;
    };

    return (
        <>
            <div className="max-h-28 w-1/2" onClick={handleOpenModal}>
                <Card
                    className={`${cn(panelVariants({ position }))}, ${panelColor} ${
                        team.code !== "TBD" && !isBetting
                            ? "cursor-pointer duration-150 ease-in-out hover:bg-blue-500"
                            : "cursor-default"
                    }`}
                >
                    <CardContent
                        className={`flex w-full items-center justify-between ${
                            position === 1 ? "flex-row-reverse" : ""
                        } `}
                    >
                        <div
                            className={`flex gap-5 ${position === 1 ? "flex-row-reverse" : ""}`}
                        >
                            <div className="flex min-h-[62px] min-w-[62px] items-center justify-center">
                                <Image
                                    loader={teamImageLoader}
                                    src={team.image}
                                    width={60}
                                    height={60}
                                    alt="team"
                                />
                            </div>
                            <div className="font-bold">{team.code}</div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border bg-gray-800">
                                <div className="text-4xl font-bold text-white">
                                    {team.result?.gameWins}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {sessionModal && <SessionModal />}
                <AnimatePresence>
                    {bettingIsOpen &&
                        matchId === match.id &&
                        teamCode === team.code && <BettingModal team={team} />}
                </AnimatePresence>
            </div>
        </>
    );
}
