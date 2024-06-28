"use client";

import React, { useEffect, useState } from "react";

export default function useHeader() {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [headerVisible, setHeaderVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop =
                window.scrollY || document.documentElement.scrollTop;
            if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
                setHeaderVisible(false);
            } else if (currentScrollTop < lastScrollTop) {
                setHeaderVisible(true);
            }
            setLastScrollTop(currentScrollTop);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop]);

    return { headerVisible };
}
