"use client";

import React, { useEffect } from "react";

type ModalRefType = {
    refs: Record<string, React.RefObject<HTMLDivElement>>;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useModalRef({ refs, setState }: ModalRefType) {
    const modalOutsideClickHandler = (event: MouseEvent) => {
        for (const key in refs) {
            if (
                refs[key].current &&
                refs[key].current.contains(event.target as Node)
            ) {
                return;
            }
        }
        setState(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", modalOutsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", modalOutsideClickHandler);
        };
    }, []);

    return { modalOutsideClickHandler };
}
