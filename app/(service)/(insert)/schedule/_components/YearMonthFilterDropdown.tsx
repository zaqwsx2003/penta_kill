"use client";

import { useState, useEffect, useRef } from "react";

interface DropdownOption {
    label: string;
    value: string;
    disabled?: boolean;
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
                    className={`inline-flex w-full justify-between rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:bg-gray-600 focus:outline-none`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {
                        options.find((option) => option.value === selectedValue)
                            ?.label
                    }
                    {isOpen ? (
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
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
                            className="-mr-1 ml-2 h-5 w-5"
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
                <div className="absolute left-0 z-10 mt-2 w-full rounded-md bg-gray-700 shadow-lg">
                    <ul className="py-1">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-600 ${
                                    option.value === selectedValue
                                        ? "bg-gray-600"
                                        : ""
                                } ${option.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                                onClick={() =>
                                    !option.disabled &&
                                    selectHandler(option.value)
                                }
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
