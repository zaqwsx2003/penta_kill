import Link from "next/link";

export default function GnbItem({
    route,
    path,
    currentPath,
}: {
    route: string;
    path: string;
    currentPath: boolean;
}) {
    return (
        <>
            <Link
                href={path}
                className={`cursor-pointer inline-block mx-10 py-6 px-4 ${
                    currentPath
                        ? "font-bold border-blue-800 dark.border-white border-b-4 py-4 text-blue-800 dark:text-white "
                        : ""
                }hover:border-blue-400 hover:border-b-4 hover:transition-all ease-in-out duration-500`}>
                <div className='text-lg'>{route}</div>
            </Link>
        </>
    );
}
