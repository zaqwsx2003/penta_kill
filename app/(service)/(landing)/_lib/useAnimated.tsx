"use client";

import React, { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

export default function useAnimated({ targetRatio }: { targetRatio: number }) {
    const [isCompleted, setIsCompleted] = useState(false);

    const count = useMotionValue(0);
    const rounded = useTransform(count, (value) => `${Math.round(value)}%`);

    useEffect(() => {
        setIsCompleted(false);
        const animation = animate(count, targetRatio, {
            duration: 3,
            onComplete: () => setIsCompleted(true),
        });
        return () => animation.stop();
    }, [count, targetRatio]);

    return { isCompleted, rounded };
}
