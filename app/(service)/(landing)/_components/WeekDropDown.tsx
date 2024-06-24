import React from "react";
import { animate, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useSelectMatchStore } from "@/lib/selectMatchStore";
import { matchWeekVariant } from "@/app/(service)/(landing)/_components/style";

type DropsDownProps = {
    matchWeek: number | undefined;
    weeklyArray: number[] | unknown[];
    isOpen: boolean;
    isClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WeekDropDown({
    matchWeek,
    weeklyArray,
    isOpen,
    isClose,
}: DropsDownProps) {
    const { selectWeek, setSelectWeek } = useSelectMatchStore();
    const selectWeekHandler = (index: number) => () => {
        setSelectWeek(index);
        isClose(false);
    };

    const handleModalClick = (e: React.MouseEvent<HTMLUListElement>) => {
        e.stopPropagation();
    };

    return (
        <motion.ul
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 15 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -left-0 top-8 z-40 flex w-32 flex-col gap-y-1 rounded-[10px] bg-white p-4"
            onClick={handleModalClick}
        >
            {weeklyArray.map((_, index: number) => (
                <motion.li
                    whileHover={{ scale: 1.1, color: "#fff" }}
                    className={cn(
                        matchWeekVariant({
                            matchWeek: matchWeek === index,
                            selectWeek: selectWeek === index,
                        }),
                    )}
                    key={index}
                    onClick={selectWeekHandler(index)}
                >
                    {index + 1}주차
                </motion.li>
            ))}
        </motion.ul>
    );
}
