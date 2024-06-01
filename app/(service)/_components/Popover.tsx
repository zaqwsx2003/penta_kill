import { Button } from "@/components/ui/button";
import { Popover as PopoverRoot, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

type Players = {
    id: string;
    summonerName: string;
    firstName: string;
    lastName: string;
    image: string;
    role: string;
};

export function Popover({ players }: { players: Players[] }) {
    return (
        <PopoverRoot>
            <PopoverTrigger asChild>
                <Button variant='outline'>+</Button>
            </PopoverTrigger>
            <PopoverContent className='flex gap-5 w-full'>
                {players.map((player) => (
                    <div className='grid gap-4' key={player.id}>
                        <div className='space-y-2'>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <Image
                                    src={player.image}
                                    alt='PlayerImage'
                                    className='w-20 h-20 '
                                />
                                <h4 className='font-medium leading-none text-center'>
                                    {player.summonerName}
                                </h4>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Image
                                src={`${player.role}.png`}
                                className='w-6 h-6 '
                                alt='PlayerImage'
                            />
                        </div>
                    </div>
                ))}
            </PopoverContent>
        </PopoverRoot>
    );
}
