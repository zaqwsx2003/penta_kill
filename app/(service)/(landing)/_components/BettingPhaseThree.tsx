import React, { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";

type BettingPhaseThreeProps = {
    handleClose: () => void;
};

export default function BettingPhaseThree({
    handleClose,
}: BettingPhaseThreeProps) {

    return (
        <motion.div
            key="phaseThree"
            initial={{ opacity: 1, x: 700 }}
            animate={{ opacity: 1, x: 0, scale: 1.5 }}
            transition={{ duration: 0.7 }}
            className="flex h-[300px] w-full flex-col items-center justify-center gap-4"
        >
            <motion.div className="text-3xl font-bold">베팅완료!</motion.div>
            <div className="flex items-center justify-center text-center text-base">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="mt-2 inline-block w-32 cursor-pointer rounded bg-blue-800 px-2 py-2 text-white ease-in-out hover:bg-blue-300 hover:font-semibold"
                    onClick={handleClose}
                >
                    확인
                </motion.button>
            </div>
        </motion.div>
    );
}
