"use client";

import React from "react";
import { motion } from "framer-motion";

import { useMatchState } from "@/lib/matchStore";
import useKoreanDateFormat from "@/lib/useDate";
import { useTeamState } from "@/lib/teamStore";
import TeamTitle from "@/app/(service)/(landing)/_components/TeamTitle";
import UserPredict from "@/app/(service)/(landing)/_components/UserPredict";
import AIPredict from "./AIPredict";
import { useBettingModalState } from "@/lib/bettingModalStore";

type BettingPhaseOneProps = {
    closing: boolean;
    handleImageLoad: () => void;
};

export default function BettingPhaseOne({
    closing,
    handleImageLoad,
}: BettingPhaseOneProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const { setBettingPhase, BettingOnClose } = useBettingModalState();
    const phaseTwoHandler = () => {
        setBettingPhase(2);
    };

    const match = useMatchState((state) => state);
    const teamRed = match.teams[0];
    const teamBlue = match.teams[1];
    const team = useTeamState((state) => state);
    const winRatio =
        teamRed.ratio > teamBlue.ratio
            ? teamRed.ratio * 100
            : teamBlue.ratio * 100;
    const winTeam =
        teamRed.ratio === teamBlue.ratio
            ? "동률"
            : teamRed.ratio > teamBlue.ratio
              ? `${teamRed.code} 승리`
              : `${teamBlue.code} 승리`;
    const aiWinRatio =
        match.teams[0].probability > match.teams[1].probability
            ? match.teams[0].probability
            : match.teams[1].probability;
    const aiWinTeam =
        match.teams[0].probability > match.teams[1].probability
            ? match.teams[0].code
            : match.teams[1].code;

    return (
        <motion.div
            key="phaseOne"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: -400 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-center px-2 text-center font-semibold text-white"
        >
            <div className="flex flex-col justify-center gap-8 py-5 text-center font-semibold text-white">
                <div className="flex flex-col items-center justify-between">
                    <p>{KoreanDateFormat(match.startTime)}</p>
                    <div className="flex flex-row items-center justify-center">
                        <TeamTitle
                            team={match.teams[0]}
                            selectTeam={team.code}
                            handleImageLoad={handleImageLoad}
                        />
                        <p className="px-10">VS</p>
                        <TeamTitle
                            team={match.teams[1]}
                            selectTeam={team.code}
                            handleImageLoad={handleImageLoad}
                        />
                    </div>
                </div>

                <div className="flex w-full flex-row items-center justify-center text-white">
                    <UserPredict winRatio={winRatio} winTeam={winTeam} />
                    <div className="my-[1%] w-[25%] rotate-90 border-[1px] border-white"></div>
                    <AIPredict aiWinTeam={aiWinTeam} aiWinRatio={aiWinRatio} />
                </div>
                {match.matchState === "unstarted" && !match.betting ? (
                    <div className="flex w-full items-center justify-center text-center text-base">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="mt-8 w-32 cursor-pointer rounded bg-blue-800 px-2 py-2 text-white ease-in-out hover:bg-blue-300 hover:font-semibold"
                            onClick={phaseTwoHandler}
                        >
                            포인트 베팅하기
                        </motion.div>
                    </div>
                ) : (
                    <div className="flex w-full items-center justify-center text-center text-base">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="mt-8 w-32 cursor-pointer rounded bg-blue-800 px-2 py-2 text-white ease-in-out hover:bg-blue-300 hover:font-semibold"
                            onClick={BettingOnClose}
                        >
                            확인
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
