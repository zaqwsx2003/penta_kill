import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card as CardRoot,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LCKTeams } from "@/dummy";
import { Avatar } from "../../../_components/Avatar";
import { Popover } from "../../_components/Popover";

export function Card() {
    return (
        <div className='flex flex-wrap justify-center'>
            {LCKTeams.map((team) => (
                <CardRoot className='min-w-80  mb-4 mr-4' key={team.id}>
                    <CardHeader>
                        <CardTitle>{team.name}</CardTitle>
                        <CardDescription className='flex item-center justify-center'>
                            <Avatar image={team.image} />
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className='flex justify-between items-center'>
                        <CardContent>{team.homeLeague?.name}</CardContent>
                        <CardContent>
                            <Popover players={team.players} />
                        </CardContent>
                    </CardFooter>
                </CardRoot>
            ))}
        </div>
    );
}
