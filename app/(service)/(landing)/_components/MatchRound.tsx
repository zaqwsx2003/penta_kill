"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import MatchCard from "@/app/(service)/(landing)/_components/MatchCard";
import { DaysMatch } from "@/model/match";
import WeekDropDown from "@/app/(service)/(landing)/_components/WeekDropDown";
import { getMatchPredictionList } from "@/app/api/api";
import Spinner from "@/app/(service)/_components/Spinner";
import ErrorPage from "@/app/(service)/_components/ErrorPage";
import useModalRef from "@/app/(service)/_lib/useModalRef";

export default function MatchRound() {
    const [matchWeek, setMatchWeek] = useState<number>(0);
    const [selectWeek, setSelectWeek] = useState<number>(matchWeek);
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const {
        data: match,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["match", "betting"],
        queryFn: getMatchPredictionList,
        staleTime: 0,
    });

    useModalRef({
        refs: { triggerRef },
        setState: setIsDropDownOpen,
    });

    useEffect(() => {
        if (match?.data) {
            setMatchWeek(match.data.currentWeek);
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
                    className="relative w-32 cursor-pointer rounded-[10px] border border-white p-4 py-1 text-white"
                    initial={false}
                    onClick={() => setIsDropDownOpen((prev) => !prev)}
                >
                    <div
                        className="flex items-center justify-between"
                        ref={triggerRef}
                    >
                        <div className="flex flex-grow justify-center font-bold">
                            {selectWeek + 1}
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
