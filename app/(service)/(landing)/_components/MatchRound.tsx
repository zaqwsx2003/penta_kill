"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import MatchCard from "@/app/(service)/(landing)/_components/MatchCard";
import { DaysMatch } from "@/model/match";
import WeekDropDown from "@/app/(service)/(landing)/_components/WeekDropDown";
import ErrorPage from "@/app/(service)/_components/ErrorPage";
import useModalRef from "@/app/(service)/_lib/useModalRef";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import { useSelectMatchStore } from "@/lib/selectMatchStore";
import MatchSkeleton from "@/app/(service)/(landing)/_components/MatchRoundSkeleton";

export default function MatchRound() {
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const axiosAuth = useAxiosAuth();
    const triggerRef = useRef<HTMLDivElement>(null);
    const { selectWeek, setSelectWeek } = useSelectMatchStore();
    const [matchWeek, setMatchWeek] = useState<number | undefined>();

    const {
        data: match,
        isLoading,
        isSuccess,
        isError,
    } = useQuery({
        queryKey: ["match", "betting", selectWeek],
        queryFn: async () => {
            const week = parseInt(selectWeek, 10);
            const response = await axiosAuth.get(
                `/bets/recentTournament/schedulesPage?page=${selectWeek}`,
            );
            return response.data;
        },
    });

    useModalRef({
        refs: { triggerRef },
        setState: setIsDropDownOpen,
    });

    useEffect(() => {
        if (isSuccess && match) {
            const currentWeek = match.data.currentBlockNameIndex;
            setMatchWeek(currentWeek);
            if (selectWeek === "") {
                setSelectWeek(currentWeek.toString());
            }
        }
    }, [isSuccess, match, selectWeek, setSelectWeek]);

    if (isLoading) return <MatchSkeleton />;
    if (isError) return <ErrorPage />;

    return (
        <>
            <div className="relative flex items-center justify-end pr-5">
                <motion.div
                    className="translate relative w-32 cursor-pointer rounded-[10px] border border-white p-4 py-1 text-white duration-100 ease-in-out hover:outline hover:outline-2 hover:outline-white"
                    initial={false}
                    onClick={() => setIsDropDownOpen((prev) => !prev)}
                >
                    <div
                        className="flex items-center justify-between"
                        ref={triggerRef}
                    >
                        <div className="flex flex-grow justify-center font-bold">
                            {selectWeek !== "" && parseInt(selectWeek, 10) + 1}
                            <span className="font-normal">주차</span>
                        </div>
                        <motion.div
                            variants={{
                                open: { rotate: 180 },
                                closed: { rotate: 0 },
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ originY: 0.55 }}
                            className=""
                        >
                            <div className="h-6 w-6">
                                <Image
                                    src="/chevron-down.svg"
                                    alt="arrow"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </motion.div>
                    </div>
                    <AnimatePresence>
                        {isDropDownOpen && (
                            <WeekDropDown
                                matchWeek={matchWeek}
                                weeklyLength={match.data.totalPages}
                                isOpen={isDropDownOpen}
                                isClose={setIsDropDownOpen}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <div className="flex flex-col gap-y-10">
                {match.data.weeklySchedules.map(
                    (match: DaysMatch, index: number) => (
                        <MatchCard key={index} matches={match} />
                    ),
                )}
            </div>
        </>
    );
}
