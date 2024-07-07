import { ImageLoaderProps } from "@/model/match";

export default function teamImageLoader({
    src,
    width,
    quality,
}: ImageLoaderProps) {
    return `${src}?w=${width}&q=${quality || 75}`;
}
