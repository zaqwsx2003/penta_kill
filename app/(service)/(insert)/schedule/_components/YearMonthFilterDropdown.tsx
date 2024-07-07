"use client";

import { useState, useEffect, useRef } from "react";

interface DropdownOption {
    label: string;
    value: string;
}

interface CustomDropdownProps {
    options: DropdownOption[];
    selectedValue: string;
    onChange: (value: string) => void;
}

export default function CustomDropdown({
    options,
    selectedValue,
    onChange,
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    function selectHandler(value: string) {
        onChange(value);
        setIsOpen(false);
    }

    function clickOutsideHandler(event: MouseEvent) {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", clickOutsideHandler);
        } else {
            document.removeEventListener("mousedown", clickOutsideHandler);
        }

        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler);
        };
    }, [isOpen]);

    return (
        <div
            ref={dropdownRef}
            className="relative box-border inline-block text-left"
        >
            <div>
                <button
                    type="button"
                    className={`inline-flex w-full justify-between rounded-[10px] bg-card px-4 py-3 text-xl font-medium text-white hover:bg-zinc-600 focus:outline-none`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {
                        options.find((option) => option.value === selectedValue)
                            ?.label
                    }
                    {isOpen ? (
                        <svg
                            className="-mr-1 ml-2 mt-1 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="-mr-1 ml-2 mt-1 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {isOpen && (
                <div className="absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-[10px] bg-zinc-700 shadow-lg">
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-zinc-600"
                                onClick={() => selectHandler(option.value)}
                            >
                                {option.label}
                                {option.value === selectedValue ? (
                                    <span className="ml-4 text-lg font-bold">
                                        ✓
                                    </span>
                                ) : (
                                    ""
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
