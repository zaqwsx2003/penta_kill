declare global {
    interface Window {
        YT: {
            Player: new (elementId: string, options: YT.PlayerOptions) => YT.Player;
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

export namespace YT {
    interface PlayerOptions {
        height: string;
        width: string;
        videoId: string;
        events: {
            onReady: (event: PlayerEvent) => void;
            onStateChange: (event: OnStateChangeEvent) => void;
        };
    }

    interface Player {
        destroy: () => void;
    }

    interface PlayerEvent {
        target: Player;
    }

    interface OnStateChangeEvent {
        data: number;
    }
}
