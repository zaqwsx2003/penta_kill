import React from "react";

type FormButtonProps = {
    label: string;
    isPending: boolean;
};

export default function FormButton({ label, isPending }: FormButtonProps) {
    return (
        <button
            className="transition-transforms mb-5 mt-10 w-full rounded-[10px] border bg-black px-10 py-2 text-white transition-colors ease-in-out hover:bg-gray-500 hover:font-bold"
            disabled={isPending}
        >
            {label}
        </button>
    );
}
