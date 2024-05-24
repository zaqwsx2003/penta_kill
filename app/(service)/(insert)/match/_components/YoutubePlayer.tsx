"use client";

import { YT } from "@/model/youtube";
import React, { useEffect, useRef } from "react";

const YouTubePlayer = () => {
    const videoId = "VGP4laO7HRk";

    const playerRef = useRef<YT.Player | null>(null);

    useEffect(() => {
        // Load the YouTube IFrame API script
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Define the callback function for the YouTube API
        const onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player("youtube-player", {
                height: "390",
                width: "640",
                videoId: videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        };

        // Check if the YouTube API script has already been loaded
        if (!window.YT) {
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } else {
            onYouTubeIframeAPIReady();
        }

        // Cleanup function to remove the player
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [videoId]);

    const onPlayerReady = (event: YT.PlayerEvent) => {
        console.log("Player is ready");
    };

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
        console.log("Player state changed", event.data);
    };

    return <div id='youtube-player'></div>;
};

export default YouTubePlayer;
