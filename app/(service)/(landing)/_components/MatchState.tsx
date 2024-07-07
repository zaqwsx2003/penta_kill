import React, { ReactNode } from "react";

const MatchStateLabel = ({
    children,
    textColor,
}: {
    children: ReactNode;
    textColor: string;
}) => {
    return (
        <div className="">
            <span
                className={`rounded-[5px] border ${textColor} px-[5px] py-[0.5px]`}
            >
                {children}
            </span>
        </div>
    );
};

export default function MatchState({ matchState }: { matchState: string }) {
    return (
        <div className="text-sm">
            {matchState === "unstarted" && (
                <MatchStateLabel textColor="text-green-300">
                    경기예정
                </MatchStateLabel>
            )}
            {matchState === "inProgress" && (
                <MatchStateLabel textColor="text-red-700">
                    경기중
                </MatchStateLabel>
            )}
            {matchState === "completed" && (
                <MatchStateLabel textColor="text-red-400">
                    경기완료
                </MatchStateLabel>
            )}
        </div>
    );
}
