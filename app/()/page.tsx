import { versers } from "@/dummy";
import MatchCard from "./_components/MatchCard";

export default function Home() {
    const match = versers.data.schedule.events;

    return (
        <div className='w-[1024px] flex flex-col gap-10'>
            {match.map((event, index) => (
                <MatchCard event={event} key={index} />
            ))}
        </div>
    );
}
