"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";
import useMatchPanelColor from "@/app/(service)/(landing)/_lib/useMatchPanelColor";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import BettingModal from "./BettingModal";
import { useBettingModalState } from "@/lib/bettingModalStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SessionModal from "./SessionModal";

type TeamPanelProps = {
    match: any;
    position: 0 | 1;
    matchState: string;
    matchTime: string;
};

const panelVariants = cva(
    `relative flex items-center light:border-none rounded-[10px] dark:border-gray-800 px-5 py-3`,
    {
        variants: {
            position: {
                0: `rounded-r-none border-r-0 justify-start`,
                1: `rounded-l-none border-l-0 justify-end`,
            },
        },
    }
);

export default function TeamPanel({ match, position, matchState, matchTime }: TeamPanelProps) {
    const session = useSession();
    const router = useRouter();
    const { bettingIsOpen, matchId, teamCode, BettingOnOpen, BettingOnClose } =
        useBettingModalState();
    const [sessionModal, setSessionModal] = useState<boolean>(false);
    const team = match.teams[position];
    const panelColor = useMatchPanelColor({ team, matchState });

    if (!team) {
        return null;
    }

    const handleOpenModal = () => {
        if (!session.data) {
            setSessionModal(true);
        } else if (matchId === match.id && teamCode === team.code) {
            BettingOnClose();
        } else {
            BettingOnOpen(match.id, team.code);
        }
    };

    return (
        <>
            <div className='w-1/2' onClick={handleOpenModal}>
                <Card className={`${cn(panelVariants({ position }))}, ${panelColor}`}>
                    <CardContent
                        className={`flex justify-between h-20 items-center w-full ${
                            position === 1 ? "flex-row-reverse" : ""
                        } `}>
                        <div className={`flex gap-5 ${position === 1 ? "flex-row-reverse" : ""}`}>
                            <div className='flex justify-center items-center min-w-[60px] min-h-[60px]'>
                                <Image src={team.image} width={60} height={60} alt='team' />
                            </div>
                            <div className='font-bold'>{team.code}</div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='bg-gray-800 flex items-center justify-center border rounded-[10px] w-12 h-12'>
                                <div className='text-white text-4xl font-bold'>
                                    {team.result?.gameWins}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {sessionModal && <SessionModal />}
                {bettingIsOpen && matchId === match.id && teamCode === team.code && (
                    <BettingModal match={match} team={team} matchTime={matchTime} />
                )}
            </div>
        </>
    );
}
