import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useMatchState } from "@/lib/matchStore";
import useKoreanDateFormat from "@/lib/useDate";
import { useTeamState } from "@/lib/teamStore";
import TeamTitle from "@/app/(service)/(landing)/_components/TeamTitle";

type BettingPhaseOneProps = {
    closing: boolean;
    setBetPhase: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>;
    handleImageLoad: () => void;
};

export default function BettingPhaseOne({
    closing,
    setBetPhase,
    handleImageLoad,
}: BettingPhaseOneProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const phaseTwoHandler = () => {
        setBetPhase(2);
    };

    const match = useMatchState((state) => state);
    const teamRed = match.teams[0];
    const teamBlue = match.teams[1];
    const team = useTeamState((state) => state);

    return (
        <motion.div
            key="phaseOne"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={closing ? { opacity: 1, x: 0 } : { opacity: 1, x: -400 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-center px-2 text-center font-semibold text-white"
        >
            <div className="flex flex-col justify-center gap-8 py-5 text-center font-semibold text-white">
                <div className="flex flex-col items-center justify-between">
                    <p>{KoreanDateFormat(match.startTime)}</p>
                    <div className="flex flex-row items-center justify-center">
                        <TeamTitle
                            team={teamRed}
                            selectTeam={team.code}
                            handleImageLoad={handleImageLoad}
                        />
                        <p className="px-5">VS</p>
                        <TeamTitle
                            team={teamBlue}
                            selectTeam={team.code}
                            handleImageLoad={handleImageLoad}
                        />
                    </div>
                </div>

                <div className="flex w-full flex-row items-center justify-center text-white">
                    <div className="flex flex-1 flex-col items-center justify-center">
                        <p className="pb-3 text-sm">유저 예측</p>
                        {teamRed.ratio === teamBlue.ratio ? (
                            <div>
                                <p className="text-3xl font-bold">
                                    {`${teamRed.ratio * 100}%`}
                                </p>
                                <p>동률</p>
                            </div>
                        ) : teamRed.ratio > teamBlue.ratio ? (
                            <div>
                                <p className="text-3xl font-bold">
                                    {`${teamRed.ratio * 100}%`}
                                </p>
                                <p>{teamRed.code} 승리</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-3xl font-bold">
                                    {`${teamBlue.ratio * 100}%`}
                                </p>
                                <p>{teamBlue.code} 승리</p>
                            </div>
                        )}
                    </div>
                    <div className="my-[1%] w-[25%] rotate-90 border-[1px] border-white"></div>
                    <div className="flex flex-1 flex-col items-center justify-center">
                        <p className="pb-3 text-sm">AI 예측</p>
                        <p className="text-3xl font-bold">57%</p>
                        <p>KT 승리</p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-center text-center text-base">
                        <motion.p
                            whileHover={{ scale: 1.1 }}
                            className="mt-2 inline-block cursor-pointer rounded bg-blue-800 px-2 py-2 text-white ease-in-out hover:bg-blue-300 hover:font-semibold"
                            onClick={phaseTwoHandler}
                        >
                            포인트 베팅하기
                        </motion.p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
