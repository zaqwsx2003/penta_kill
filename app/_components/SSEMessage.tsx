import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { MatchNoticeType } from "@/model/SSE";
import useKoreanDateFormat from "@/lib/useDate";

export type SSEMessageProps = {
    notice: MatchNoticeType;
    messageNumber: number;
    removeNotice: () => void;
};

export default function SSEMessage({
    notice,
    messageNumber,
    removeNotice,
}: SSEMessageProps) {
    const KoreanDateFormat = (dates: string) => useKoreanDateFormat(dates);
    return (
        <motion.div
            className={cn(
                `z-50 my-3 rounded-[10px] border-4 border-white bg-white p-4 duration-0 ease-linear hover:border-green-500`,
            )}
            key="phaseOne"
            whileHover={{ scale: 1.05 }}
            onClick={() => removeNotice()}
        >
            {notice.type === "matchStatusNotice" && (
                <>
                    <div className="flex flex-row justify-between gap-4">
                        <div className="font-semibold">경기시작알림</div>
                        <div className="self-end text-sm text-gray-800">
                            {KoreanDateFormat(notice.time)}
                        </div>
                    </div>
                    <div className="mt-3 flex flex-row justify-end gap-4">
                        <div className="text-xl font-bold">{notice.team1}</div>
                        <span>vs</span>
                        <div className="text-xl font-bold">{notice.team2}</div>
                    </div>
                </>
            )}
            {notice.type === "matchResultNotice" && (
                <>
                    <div className="flex flex-row justify-between gap-4">
                        <div className="font-semibold">승부결과알림</div>
                        <div className="self-end text-sm text-gray-800">
                            {KoreanDateFormat(notice.time)}
                        </div>
                    </div>
                    <div className="mt-3 flex justify-end text-xl font-bold">
                        + {notice.point}
                    </div>
                    <div className="flex flex-row justify-end gap-4 text-sm text-gray-800">
                        <div>{notice.team1}</div>
                        <span>vs</span>
                        <div>{notice.team2}</div>
                    </div>
                </>
            )}
            {notice.type === "signupNotice" && (
                <>
                    <div className="flex flex-row justify-between gap-4">
                        <div className="font-semibold">회원가입 포인트</div>
                        <div className="self-end text-sm text-gray-800">
                            {KoreanDateFormat(notice.time)}
                        </div>
                        <div className="mt-3 flex justify-end text-xl font-bold">
                            + {notice.point}
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
}
