import React from "react";

export default function ErrorPage() {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-800 text-center text-white">
            <p className="mb-5">
                문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
            </p>
            <button
                onClick={handleReload}
                className="mt-5 w-40 rounded bg-blue-500 py-2"
            >
                새로고침
            </button>
        </div>
    );
}
