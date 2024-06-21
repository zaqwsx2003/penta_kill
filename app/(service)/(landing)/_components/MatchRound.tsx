"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";

import MatchCard from "@/app/(service)/(landing)/_components/MatchCard";
import { DaysMatch } from "@/model/match";
import WeekDropDown from "@/app/(service)/(landing)/_components/WeekDropDown";
import Spinner from "@/app/(service)/_components/Spinner";
import ErrorPage from "@/app/(service)/_components/ErrorPage";
import useModalRef from "@/app/(service)/_lib/useModalRef";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";

export default function MatchRound() {
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const axiosAuth = useAxiosAuth();

    const {
        data: match,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["match", "betting"],
        queryFn: async () => {
            try {
                const response = await axiosAuth.get(
                    `/bets/recentTournament/schedules`,
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        staleTime: 0,
    });

    const [matchWeek, setMatchWeek] = useState<number | undefined>(0);
    const [selectWeek, setSelectWeek] = useState<number | undefined>(matchWeek);

    useModalRef({
        refs: { triggerRef },
        setState: setIsDropDownOpen,
    });

    useEffect(() => {
        if (match?.data) {
            setMatchWeek(match.data.currentWeek);
            setSelectWeek(match.data.currentWeek);
        }
    }, [match]);

    if (isLoading) return <Spinner />;

    if (isError) return <ErrorPage />;

    const weeklySchedules = match?.data?.weeklySchedules;
    const weeklyArray = Array.from({ length: weeklySchedules?.length || 0 });
    const weeklyArrayFiltered = weeklySchedules?.filter(
        (data: any, index: number) => index === selectWeek,
    );

    console.log(match);
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
                            {selectWeek !== undefined
                                ? selectWeek + 1
                                : "주차 선택"}
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
                            <Image
                                src="/chevron-down.svg"
                                alt="arrow"
                                width={24}
                                height={24}
                            />
                        </motion.div>
                    </div>
                    <AnimatePresence>
                        {isDropDownOpen && (
                            <WeekDropDown
                                matchWeek={matchWeek}
                                selectWeek={selectWeek}
                                weeklyArray={weeklyArray}
                                setSelectWeek={setSelectWeek}
                                isOpen={isDropDownOpen}
                                isClose={setIsDropDownOpen}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <div className="flex flex-col gap-y-10">
                {weeklyArrayFiltered?.map((event: any, index: number) => (
                    <Fragment key={index}>
                        {event.map((match: DaysMatch, index: number) => (
                            <MatchCard key={index} matches={match} />
                        ))}
                    </Fragment>
                ))}
            </div>
        </>
    );
}
