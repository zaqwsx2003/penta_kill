"use client";

import { useSelectedGameStore } from "@/lib/gameSelectStore";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

import Image from "next/image";
import { useBettingModalState } from "@/lib/bettingModalStore";
import useKoreanDateFormat from "@/lib/useDate";
import { postBettingPoint } from "@/app/api/api";

export default function BettingModal({ match, team, matchTime }: any) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    const { bettingIsOpen, matchId, teamCode, BettingOnOpen, BettingOnClose } =
        useBettingModalState();
    const { setBet, betInfo } = useSelectedGameStore();
    const [inputOpen, setInputOpen] = useState<boolean>(false);
    const [point, setPoint] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>("");

    const mutation = useMutation({
        mutationKey: ["betting", "point"],
        mutationFn: postBettingPoint,
        onSuccess: () => {
            BettingOnClose();
        },
        onError: (error) => {
            console.log(error);
            BettingOnClose();
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
        BettingOnClose();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleBackground = (e: React.MouseEvent<HTMLDivElement>) => {
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

    return (
        <>
            <div
                className='fixed inset-0 z-40 bg-black bg-opacity-50'
                onClick={handleBackground}></div>
            <div
                className='fixed z-50 bottom-4 rounded-[10px] left-0 right-0 mx-auto w-full max-w-md p-4 bg-white shadow-lg '
                onClick={handleModalClick}>
                <form className='flex flex-col gap-y-4'>
                    <p className='text-3xl font-bold text-center'>승리팀 예측</p>
                    <div className='text-black bg-gray-300 text-center px-2 py-5 font-semibold'>
                        {team.name}
                        <span className='font-normal rounded'>팀 을 선택하셨습니다.</span>
                        <p>{KoreanDateFormat(matchTime)}</p>
                    </div>
                    <div>
                        {point ? (
                            <div className='flex flex-row text-center font-bold items-center justify-center'>
                                <span>{point}</span>
                                <Image src='/pointbeed.png' width={30} height={30} alt='point' />
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
                                        className='text-white bg-blue-500 hover:bg-blue-300 p-1 rounded'
                                        onClick={setPointHandler}>
                                        확인
                                    </div>
                                    <div
                                        className='text-white bg-red-500 hover:bg-red-300 p-1 rounded'
                                        onClick={setPointCancelHandler}>
                                        취소
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div onClick={inputHandler} className='text-center'>
                                <p className='text-white inline-block bg-blue-500 py-2 px-2 rounded hover:font-semibold hover:bg-blue-300 ease-in-out my-2'>
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
                        className='bg-red-500 text-white p-2 rounded inline-block px-5'
                        onClick={BettingOnClose}>
                        닫기
                    </button>
                </form>
            </div>
        </>
    );
}
