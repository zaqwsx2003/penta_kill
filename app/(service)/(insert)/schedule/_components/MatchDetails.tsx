import Image from "next/image";

export default function MatchDetails() {
    return (
        <div className="my-2 flex items-center justify-between rounded-lg bg-gray-800 text-white">
            <div className="text-lg">18:00</div>
            <div className="flex items-center">
                <span className="text-lg font-bold">OMG</span>
                <Image
                    src="/temp_team_logo.svg"
                    width={100}
                    height={60}
                    alt="Team Logo"
                />
            </div>
            <div className="mx-2 flex items-center rounded-md bg-gray-700 px-2 py-1">
                <span className="text-lg">0</span>
                <span className="mx-1 text-lg">|</span>
                <span className="text-lg">2</span>
            </div>
            <div className="flex items-center">
                <Image
                    src="/temp_team_logo.svg"
                    width={100}
                    height={60}
                    alt="Team Logo"
                />
                <span className="text-lg font-semibold">LNG</span>
            </div>
        </div>
    );
}
