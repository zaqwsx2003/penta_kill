import { cva } from "class-variance-authority";

export const menuActivate = cva(
    `absolute -bottom-2 -left-2 -right-2 h-1 rounded-full bg-indigo-300  scale-x-0`,
    {
        variants: {
            currentPath: {
                true: `scale-x-100 bg-indigo-500`,
            },
            mouseHover: {
                true: `transition-transform duration-300 ease-out scale-x-100`,
            },
        },
    },
);
