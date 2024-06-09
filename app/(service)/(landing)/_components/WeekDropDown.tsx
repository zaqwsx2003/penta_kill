import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

type DropsDownProps = {
    currentWeek: number;
    setCurrentWeek: React.Dispatch<React.SetStateAction<number>>;
    weeklyArray: number[] | unknown[];
};

const matchWeekVariant = cva(
    `flex flex-col justify-center items-center cursor-pointer py-1 px-2 hover:bg-blue-500 rounded `,
    {
        variants: {
            selectWeek: { true: `border border-blue-500 px-2 rounded`, false: "" },
        },
    }
);

export default function WeekDropDown({ currentWeek, setCurrentWeek, weeklyArray }: DropsDownProps) {
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const selectWeek = (index: number) => () => {
        setCurrentWeek(index);
        setIsDropDownOpen(false);
    };

    useEffect(() => {
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
            <div className='relative flex items-center justify-center'>
                <div
                    className='text-white absolute border border-white rounded-[10px] px-4 py-1'
                    onClick={() => setIsDropDownOpen((prev) => !prev)}>
                    <div className='flex items-center cursor-pointer' ref={triggerRef}>
                        <div>{currentWeek + 1}주차</div>
                        <div className='pl-1'>
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center relative z-50'>
                <div
                    className={`absolute transition-all duration-300 ease-in-out overflow-hidden ${
                        isDropDownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                    <div className=' bg-white p-4 rounded-[10px]' ref={dropDownRef}>
                        {weeklyArray.map((_, index: number) => (
                            <div
                                className={cn(
                                    matchWeekVariant({ selectWeek: currentWeek === index })
                                )}
                                key={index}
                                onClick={selectWeek(index)}>
                                {index + 1}주차
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
