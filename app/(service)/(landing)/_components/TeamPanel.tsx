"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useBettingModalState } from "@/lib/bettingModalStore";
import useMatchPanelColor from "@/app/(service)/(landing)/_lib/useMatchPanelColor";
import BettingModal from "@/app/(service)/(landing)/_components/BettingModal";
import SessionModal from "@/app/(service)/(landing)/_components/SessionModal";
import { panelVariants } from "@/app/(service)/(landing)/_components/style";
import { MatchDetails } from "@/model/match";
import { useMatchState } from "@/lib/matchStore";
import { useTeamState } from "@/lib/teamStore";

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
    const session = useSession();
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

    const setTeamData = useTeamState((state) => state.setTeamData);
    const setMatchData = useMatchState((state) => state.setMatchData);

    if (!team) {
        return null;
    }

    const handleOpenModal = () => {
        if (
            team.code === "TBD" ||
            (matchState === "inProgress" && !isBetting) ||
            matchState !== "unstarted" ||
            (matchState === "unstarted" && isBetting)
        ) {
            return;
        }
        if (!session.data) {
            setSessionModal(true);
        } else if (matchId === match.id && teamCode === team.code) {
            BettingOnClose();
        } else {
            setTeamData(team);
            const matchData = {
                ...match,
                startTime: new Date(matchTime).toISOString(),
            };
            setMatchData(matchData);
            BettingOnOpen(match.id, team.code);
        }
    };

    return (
        <>
            <div className="w-1/2 h-28" onClick={handleOpenModal}>
                <Card
                    className={`${cn(panelVariants({ position }))}, ${panelColor} ${
                        matchState === "unstarted" &&
                        team.code !== "TBD" &&
                        !isBetting
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
                            <div className="flex min-h-[60px] min-w-[60px] items-center justify-center">
                                <Image
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
