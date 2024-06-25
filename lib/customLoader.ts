"use client";

type ImageLoaderProps = {
    src: string;
    width: number;
    quality?: number;
};

export default function myImageLoader({
    src,
    width,
    quality,
}: ImageLoaderProps) {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}?w=${width}&q=${quality || 75}`;
}
