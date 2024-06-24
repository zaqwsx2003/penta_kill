"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import MatchCard from "@/app/(service)/(landing)/_components/MatchCard";
import { DaysMatch } from "@/model/match";
import WeekDropDown from "@/app/(service)/(landing)/_components/WeekDropDown";
import Spinner from "@/app/(service)/_components/Spinner";
import ErrorPage from "@/app/(service)/_components/ErrorPage";
import useModalRef from "@/app/(service)/_lib/useModalRef";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import { useSelectMatchStore } from "@/lib/selectMatchStore";
import { useSession } from "next-auth/react";

export default function MatchRound() {
    const { data: session } = useSession();
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const axiosAuth = useAxiosAuth();
    const { selectWeek, setSelectWeek } = useSelectMatchStore();
    const triggerRef = useRef<HTMLDivElement>(null);
    const [matchWeek, setMatchWeek] = useState<number | undefined>();

    const {
        data: match,
        isLoading,
        isSuccess,
        isError,
    } = useQuery({
        queryKey: ["match", "betting"],
        queryFn: async () => {
            const response = await axiosAuth.get(
                `/bets/recentTournament/schedules`,
            );
            return response.data;
        },
        staleTime: 0,
    });

    useModalRef({
        refs: { triggerRef },
        setState: setIsDropDownOpen,
    });

    useEffect(() => {
        if (isSuccess && match) {
            const currentWeek = match.data.currentWeek;
            setMatchWeek(currentWeek);
            if (selectWeek === undefined) {
                setSelectWeek(currentWeek);
            }
        }
    }, [isSuccess, match, selectWeek, setSelectWeek]);

    if (isLoading) return <Spinner />;

    if (isError) return <ErrorPage />;

    const weeklySchedules = match?.data?.weeklySchedules;
    const weeklyArray = Array.from({ length: weeklySchedules?.length || 0 });
    const weeklyArrayFiltered = weeklySchedules?.filter(
        (data: any, index: number) => index === selectWeek,
    );

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
                                weeklyArray={weeklyArray}
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
