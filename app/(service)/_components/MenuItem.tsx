import React from "react";

type MenuItemProps = {
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
};

export default function MenuItem({ icon, children, onClick }: MenuItemProps) {
    return (
        <li
            className="flex cursor-pointer items-center border-t border-gray-300 p-3 text-neutral-500 hover:font-semibold hover:text-neutral-900"
            onClick={onClick}
        >
            {icon}
            <div className="ml-3">{children}</div>
        </li>
    );
}
