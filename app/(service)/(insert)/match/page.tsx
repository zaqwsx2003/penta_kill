"use client";

import React, { useEffect } from "react";
import YouTubePlayer from "./_components/YoutubePlayer";
import Test from "./_components/test";

export default function page() {
    return (
        <div>
            <div>
                <YouTubePlayer />
            </div>
            <Test />
        </div>
    );
}
