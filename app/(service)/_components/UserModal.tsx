import React from "react";
import { IoIosContact, IoIosLogOut } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import MenuItem from "@/app/(service)/_components/MenuItem";

export default function UserModal() {
    const { data: session } = useSession();
    const route = useRouter();

    const logoutHandler = () => {
        signOut();
        route.push("/");
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className={`absolute right-[-30px] top-[55px] flex w-36 transform justify-center rounded bg-white transition duration-500 ease-in-out`}
            >
                <div className="px-1">
                    <div className="absolute -top-6 left-0 right-0 h-6 text-black" />
                    <div className="absolute right-[34px] top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                    <h3 className="line w-full pt-5 text-center text-lg font-semibold leading-5 text-black">
                        {session?.user.name}
                        <span className="text-sm font-normal">님</span>
                    </h3>
                    <div className="flex flex-row items-center justify-center">
                        <div className="text-black">
                            {session?.user.point}
                        </div>
                        <div className="w-8">
                            <Image
                                src="/pointbeed.png"
                                width={30}
                                height={30}
                                alt="point"
                            />
                        </div>
                    </div>
                    <ul className="pt-3">
                        <MenuItem icon={<IoIosContact />} onClick={() => {}}>
                            내 정보
                        </MenuItem>
                        <MenuItem
                            icon={<IoIosLogOut />}
                            onClick={logoutHandler}
                        >
                            로그아웃
                        </MenuItem>
                    </ul>
                </div>
            </motion.div>
        </>
    );
}
