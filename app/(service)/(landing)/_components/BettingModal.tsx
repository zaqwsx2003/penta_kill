"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { useBettingModalState } from "@/lib/bettingModalStore";
import BettingPhaseOneModal from "./BettingPhaseOne";
import { MatchTeams } from "@/model/match";
import BettingPhaseTwo from "./BettingPhaseTwo";
import BettingPhaseThree from "./BettingPhaseThree";
import Spinner from "@/app/(service)/_components/Spinner";
import { useRefreshToken } from "@/lib/axiosHooks/useRefreshToken";

type BettingModalProps = {
    team: MatchTeams;
};

export default function BettingModal({ team }: BettingModalProps) {
    const { bettingPhase, setBettingPhase, bettingIsOpen, BettingOnClose } =
        useBettingModalState();
    const [closing, setClosing] = useState(false);
    const refreshToken = useRefreshToken();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleBackground = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleClose = () => {
        BettingOnClose();
        // refreshToken();
        setClosing(true);

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
            setClosing(false);
        }
    }, [bettingIsOpen]);

    useEffect(() => {
        document.body.style.cssText = `
            position: fixed;
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = "";
            window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
    }, []);

    return (
        <>
            <div
                className="fixed inset-0 z-40 overflow-hidden bg-black bg-opacity-50"
                onClick={handleBackground}
            />
            <motion.div
                initial={{ opacity: 1, y: 700 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 700 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    duration: 1.5,
                }}
                className="fixed bottom-20 left-0 right-0 z-50 mx-auto h-[430px] w-[450px] max-w-md overflow-hidden rounded-[10px] bg-blue-500 shadow-lg"
                onClick={handleModalClick}
            >
                <div className="relative h-full flex-col gap-y-4 p-5 text-white">
                    <LayoutGroup>
                        {isLoading ? (
                            <div className="flex h-80 items-center justify-center">
                                <Spinner />
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                {bettingPhase === 1 && (
                                    <BettingPhaseOneModal
                                        closing={closing}
                                        handleImageLoad={handleImageLoad}
                                    />
                                )}
                            </AnimatePresence>
                        )}
                        <AnimatePresence mode="wait">
                            {bettingPhase === 2 && <BettingPhaseTwo />}
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            {bettingPhase === 3 && (
                                <BettingPhaseThree handleClose={handleClose} />
                            )}
                        </AnimatePresence>
                        {bettingPhase !== 3 && (
                            <button
                                type="button"
                                className="absolute right-3 top-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white duration-200 ease-in-out hover:bg-red-500"
                                onClick={handleClose}
                            >
                                <NextImage
                                    src="/x.svg"
                                    width={40}
                                    height={40}
                                    alt="close"
                                />
                            </button>
                        )}
                    </LayoutGroup>
                </div>
            </motion.div>
        </>
    );
}
