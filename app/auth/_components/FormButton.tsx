import React, { useTransition } from "react";

type FormButtonProps = {
    label: string;
    isPending: boolean;
};

export default function FormButton({ label, isPending }: FormButtonProps) {
    return (
        <button
            className='bg-black border w-full px-10 py-2 rounded-[10px] mt-10 mb-5 text-white hover:bg-gray-500 ease-in-out transition-colors hover:font-bold transition-transforms'
            disabled={isPending}>
            {label}
        </button>
    );
}
