"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { useBettingModalState } from "@/lib/bettingModalStore";
import useKoreanDateFormat from "@/lib/useDate";
import BettingPhaseOneModal from "./BettingPhaseOne";
import { MatchDetails, MatchTeams } from "@/model/match";
import BettingPhaseTwo from "./BettingPhaseTwo";
import BettingPhaseThree from "./BettingPhaseThree";
import Spinner from "@/app/(service)/_components/Spinner";

type BettingModalProps = {
    match: MatchDetails;
    team: MatchTeams;
    matchTime: string;
};

export default function BettingModal({
    match,
    team,
    matchTime,
}: BettingModalProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const { bettingIsOpen, BettingOnClose } = useBettingModalState();
    const [closing, setClosing] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [betPhase, setBetPhase] = useState<0 | 1 | 2 | 3>(0);
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleBackground = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleClose = () => {
        setClosing(true);
        setBetPhase(0);
        setTimeout(() => {
            BettingOnClose();
        }, 0);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        if (team.image) {
            const img = new Image();
            img.src = team.image;
            img.onload = handleImageLoad;
        }
    }, [team.image]);

    useEffect(() => {
        if (bettingIsOpen) {
            setBetPhase(1);
        } else if (!bettingIsOpen) {
            setBetPhase(0);
        }
    }, [bettingIsOpen, closing]);

    return (
        <>
            <div
                className="fixed inset-0 z-40 overflow-hidden bg-black bg-opacity-50"
                onClick={handleBackground}
            />
            <motion.div
                initial={{ opacity: 1, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 500 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    duration: 0.8,
                }}
                className="fixed bottom-20 left-0 right-0 z-50 mx-auto h-[450px] w-[450px] max-w-md overflow-hidden rounded-[10px] bg-blue-500 shadow-lg"
                onClick={handleModalClick}
            >
                <div className="relative flex-col gap-y-4 p-5 text-white">
                    <LayoutGroup>
                        {isLoading ? (
                            <div className="flex h-80 items-center justify-center">
                                <Spinner />
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                {betPhase === 1 && (
                                    <BettingPhaseOneModal
                                        closing={closing}
                                        setBetPhase={setBetPhase}
                                        handleImageLoad={handleImageLoad}
                                    />
                                )}
                            </AnimatePresence>
                        )}
                        <AnimatePresence mode="wait">
                            {betPhase === 2 && (
                                <BettingPhaseTwo
                                    match={match}
                                    closing={closing}
                                    setBetPhase={setBetPhase}
                                />
                            )}
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            {betPhase === 3 && <BettingPhaseThree />}
                        </AnimatePresence>
                        <button
                            type="button"
                            className="absolute right-3 top-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white duration-200 ease-in-out hover:bg-red-500"
                            onClick={handleClose}
                        >
                            <NextImage
                                src="/x.svg"
                                width={20}
                                height={20}
                                alt="close"
                            />
                        </button>
                    </LayoutGroup>
                </div>
            </motion.div>
        </>
    );
}
