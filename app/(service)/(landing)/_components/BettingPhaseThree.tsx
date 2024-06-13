import React from "react";
import { motion } from "framer-motion";

export default function BettingPhaseThree() {
    return (
        <motion.div
            key="phaseThree"
            initial={{ opacity: 1, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: -500 }}
            transition={{ duration: 0.5 }}
            className="flex h-[300px] w-full flex-col items-center justify-center gap-4"
        >
            <div>베팅완료!</div>
        </motion.div>
    );
}
