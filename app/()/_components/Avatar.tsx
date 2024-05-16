import { Avatar as AvatarRoot, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Avatar({ image }: { image: string }) {
    return (
        <AvatarRoot>
            <AvatarImage src={image} alt='TeamImage' />
            <AvatarFallback>CN</AvatarFallback>
        </AvatarRoot>
    );
}
