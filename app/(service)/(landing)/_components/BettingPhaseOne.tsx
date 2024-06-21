"use client";

import React, { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

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

    const [userWinCount, setUserWinCount] = useState(false);
    const [aiWinCount, setAiWinCount] = useState(false);

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

    const count = useMotionValue(0);
    const rounded = useTransform(count, (value) => `${Math.round(value)}%`);
    const secondCount = useMotionValue(0);
    const secondRounded = useTransform(
        secondCount,
        (value) => `${Math.round(value)}%`,
    );

    useEffect(() => {
        setUserWinCount(false);
        const animation = animate(count, winRatio, {
            duration: 3,
            onComplete: () => setUserWinCount(true),
        });
        return () => animation.stop();
    }, [count, winRatio]);

    useEffect(() => {
        setAiWinCount(false);
        const secondAnimation = animate(secondCount, aiWinRatio, {
            duration: 3,
            onComplete: () => setAiWinCount(true),
        });
        return () => secondAnimation.stop();
    }, [secondCount, aiWinRatio]);

    return (
        <motion.div
            key="phaseOne"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: -400 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-center px-2 text-center font-semibold text-white"
        >
            <div className="flex h-fit flex-col justify-center gap-8 py-5 text-center font-semibold text-white">
                <div className="flex flex-col items-center justify-between">
                    <p>{KoreanDateFormat(match.startTime)}</p>
                    <div className="flex flex-row items-center justify-center">
                        <TeamTitle
                            team={teamRed}
                            selectTeam={team.code}
                            handleImageLoad={handleImageLoad}
                        />
                        <p className="px-10">VS</p>
                        <TeamTitle
                            team={teamBlue}
                            selectTeam={team.code}
                            handleImageLoad={handleImageLoad}
                        />
                    </div>
                </div>

                <div className="flex w-full flex-row items-center justify-center text-white">
                    <div className="relative flex flex-1 flex-col items-center justify-center">
                        <p className="pb-3 text-sm">유저 예측</p>
                        <div>
                            <motion.p className="text-3xl font-bold">
                                {rounded}
                            </motion.p>
                            {userWinCount && (
                                <motion.p
                                    key="userWinCount"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute top-full mt-2 text-lg"
                                >
                                    {winTeam}
                                </motion.p>
                            )}
                        </div>
                    </div>
                    <div className="my-[1%] w-[25%] rotate-90 border-[1px] border-white"></div>
                    <div className="relative flex flex-1 flex-col items-center justify-center">
                        <p className="pb-3 text-sm">AI 예측</p>
                        <motion.p className="text-3xl font-bold">
                            {secondRounded}
                        </motion.p>
                        {aiWinCount && (
                            <motion.p
                                key="aiWinCount"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-full mt-2 text-lg"
                            >
                                {aiWinTeam}승리
                            </motion.p>
                        )}
                    </div>
                </div>

                <div className="flex w-full items-center justify-center text-center text-base">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mt-2 w-32 cursor-pointer rounded bg-blue-800 px-2 py-2 text-white ease-in-out hover:bg-blue-300 hover:font-semibold"
                        onClick={phaseTwoHandler}
                    >
                        포인트 베팅하기
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
