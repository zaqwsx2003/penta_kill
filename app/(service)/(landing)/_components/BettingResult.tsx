import React from "react";

type BettingResultProps = {
    matchState: string;
    bettingState: boolean;
    bettingResult: string | null;
};

export default function BettingResult({
    matchState,
    bettingState,
    bettingResult,
}: BettingResultProps) {
    return (
        <>
            {matchState === "completed" &&
            bettingState === false &&
            bettingResult === null ? (
                <div>
                    <span className="rounded-[5px] bg-gray-300 px-[5px] py-[1px] text-sm text-white opacity-[0.4]">
                        미참여
                    </span>
                </div>
            ) : matchState === "completed" &&
              bettingState === true &&
              bettingResult !== null ? (
                <div className="text-sm text-white">
                    {bettingResult === "win" ? (
                        <span className="rounded-[5px] bg-blue-400 px-[5px] py-[2px] text-sm text-white">
                            예측성공
                        </span>
                    ) : (
                        <span className="py-[2px]text-sm rounded-[5px] bg-red-400 px-[5px] text-white">
                            예측실패
                        </span>
                    )}
                </div>
            ) : matchState === "unstarted" &&
              bettingState === false &&
              bettingResult === null ? (
                <div className="text-sm text-white">
                    <span className="text-sm text-white">참여가능</span>
                </div>
            ) : matchState !== "completed" &&
              bettingState === true &&
              bettingResult === "unstarted" ? (
                <div className="text-sm text-white">
                    <span className="text-sm text-blue-500">참여완료</span>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}
