"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";

import useMatchPanelColor from "@/app/(service)/(landing)/_lib/useMatchPanelColor";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useKoreanDateFormat from "@/app/(service)/_lib/useDate";
import { useSelectedGameStore } from "@/lib/gameSelectStore";
import { useMutation } from "@tanstack/react-query";
import instance from "@/app/api/instance";

type TeamPanelProps = {
    match: any;
    position: 0 | 1;
    matchState: string;
    onClick: () => void;
    isModalOpen: boolean;
    matchTime: string;
    setIsModalOpen: (open: boolean) => void;
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

export default function TeamPanel({
    match,
    position,
    matchState,
    onClick,
    isModalOpen,
    matchTime,
    setIsModalOpen,
}: TeamPanelProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const { setBet, betInfo } = useSelectedGameStore();
    const team = match.teams[position];
    const panelColor = useMatchPanelColor({ team, matchState });

    const [inputOpen, setInputOpen] = useState<boolean>(false);
    const [point, setPoint] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>("");

    const mutation = useMutation({
        mutationKey: ["betting", "point"],
        mutationFn: async (data: { matchId: string; teamCode: string; point: number }) => {
            const response = await instance.post("/points/bettings", data);
            return response.data;
        },
        onSuccess: () => {
            setIsModalOpen(false);
        },
        onError: (error) => {
            setIsModalOpen(false);
        },
    });

    const toggleBet = () => {
        if (!inputOpen && betInfo?.teamCode === team.code && betInfo?.matchId === match.id) {
            setBet(match.id, team.code, null);
        } else {
            const points = parseInt(inputValue, 10);
            if (!isNaN(points)) {
                setBet(match.id, team.code, points);
                mutation.mutate({
                    matchId: match.id,
                    teamCode: team.code,
                    point: points,
                });
            }
        }
        setInputOpen(false);
    };

    const handleModalClick = (e: React.MouseEvent<HTMLFormElement>) => {
        e.stopPropagation();
    };

    const inputHandler = () => {
        setInputOpen(true);
    };

    const setPointHandler = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value)) {
            setPoint(value);
            setInputOpen(false);
        }
    };

    const setPointCancelHandler = () => {
        setInputOpen(false);
    };

    if (!team) {
        return null;
    }

    return (
        <>
            <div className='w-1/2' onClick={onClick}>
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
                {isModalOpen && (
                    <div className='fixed z-50 bottom-4 rounded-[10px] left-1/2 transform -translate-x-1/2 mx-auto w-full max-w-md p-4 bg-white shadow-lg'>
                        <form onClick={handleModalClick} className='flex flex-col gap-y-4'>
                            <p className='text-3xl font-bold text-center'>승리팀 예측</p>
                            <div className='text-black bg-gray-300 text-center px-2 py-2 font-semibold'>
                                {team.name}
                                <span className='font-normal rounded'>팀 을 선택하셨습니다.</span>
                                <p>{KoreanDateFormat(matchTime)}</p>
                            </div>
                            <div>
                                {point ? (
                                    <div className='flex flex-row text-center font-bold items-center justify-center'>
                                        <span>{point}</span>
                                        <Image
                                            src='/pointbeed.png'
                                            width={30}
                                            height={30}
                                            alt='point'
                                        />
                                    </div>
                                ) : inputOpen ? (
                                    <div className='flex flex-row justify-between gap-2 rounded-[10px] border-[2px] py-2 pl-4 pr-5'>
                                        <input
                                            type='text'
                                            placeholder='배팅 포인트를 입력하세요'
                                            className='border rounded  flex-1 outline-none border-none text-right pr-3'
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />
                                        <div className='flex gap-2 flex-row items-center justify-center'>
                                            <div
                                                className='bg-blue-500 hover:bg-blue-300 p-1 rounded'
                                                onClick={setPointHandler}>
                                                확인
                                            </div>
                                            <div
                                                className='bg-red-500 hover:bg-red-300 p-1 rounded'
                                                onClick={setPointCancelHandler}>
                                                취소
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div onClick={inputHandler} className='text-center'>
                                        <p className='inline-block bg-blue-500 py-2 px-2 rounded hover:font-semibold hover:bg-blue-300 ease-in-out my-2'>
                                            포인트 입력하기
                                        </p>
                                    </div>
                                )}
                            </div>
                            <button
                                type='button'
                                onClick={toggleBet}
                                className='bg-blue-500 text-white p-2 rounded inline-block px-5 '>
                                확인
                            </button>
                            <button
                                type='button'
                                onClick={onClick}
                                className='bg-red-500 text-white p-2 rounded inline-block px-5'>
                                닫기
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
