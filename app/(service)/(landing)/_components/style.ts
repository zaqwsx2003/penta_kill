import { cva } from "class-variance-authority";

export const matchWeekVariant = cva(
    `text-black flex flex-col justify-center items-center cursor-pointer py-1 px-2 hover:bg-blue-500 rounded `,
    {
        variants: {
            matchWeek: {
                true: `border border-blue-500 px-2 rounded`,
                false: "",
            },
            selectWeek: { true: "font-semibold text-indigo-500", false: "" },
        },
    },
);

export const panelVariants = cva(
    `relative flex items-center rounded-[10px] px-5 py-3`,
    {
        variants: {
            position: {
                0: `rounded-r-none border-r-0 justify-start`,
                1: `rounded-l-none border-l-0 justify-end`,
            },
        },
    },
);
