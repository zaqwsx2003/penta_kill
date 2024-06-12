import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

type DropsDownProps = {
    currentWeek: number;
    weeklyArray: number[] | unknown[];
};

const matchWeekVariant = cva(
    `flex flex-col justify-center items-center cursor-pointer py-1 px-2 hover:bg-blue-500 rounded `,
    {
        variants: {
            matchWeek: {
                true: `border border-blue-500 px-2 rounded`,
                false: "",
            },
            selectWeek: { true: "" },
        },
    },
);

export default function WeekDropDown({
    currentWeek,
    weeklyArray,
}: DropsDownProps) {
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const [selectedWeek, setSelectedWeek] = useState<number>(0);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const matchWeek = useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsDropDownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <>
            <div className="relative flex items-center justify-center">
                <div
                    className="absolute rounded-[10px] border border-white px-4 py-1 text-white"
                    onClick={() => setIsDropDownOpen((prev) => !prev)}
                >
                    <div
                        className="flex cursor-pointer items-center"
                        ref={triggerRef}
                    >
                        <div>{currentWeek + 1}주차</div>
                        <div className="pl-1">
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative z-50 flex justify-center">
                <div
                    className={`absolute overflow-hidden transition-all duration-300 ease-in-out ${
                        isDropDownOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div
                        className="rounded-[10px] bg-white p-4"
                        ref={dropDownRef}
                    >
                        {weeklyArray.map((_, index: number) => (
                            <div
                                className={cn(
                                    matchWeekVariant({
                                        matchWeek: currentWeek === index,
                                        selectWeek: currentWeek === index,
                                    }),
                                )}
                                key={index}
                                onClick={() => {}}
                            >
                                {index + 1}주차
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
