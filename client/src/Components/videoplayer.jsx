import ReactPlayer from "react-player";
import { useState, useEffect, useRef } from "react";
import "./videoplayer.css";

function VideoPlayer({ videoUrl, subtitleUrl }) {
    const playerRef = useRef(null);
    const reactPlayerRef = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.focus();
        }

        const handleClickOutside = (event) => {
            if (
                playerRef.current &&
                !playerRef.current.contains(event.target)
            ) {
                playerRef.current.focus();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleKeyDown = (event) => {
        if (reactPlayerRef.current) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (reactPlayerRef.current.getInternalPlayer().paused) {
                    reactPlayerRef.current.getInternalPlayer().play();
                } else {
                    reactPlayerRef.current.getInternalPlayer().pause();
                }
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();
                setVolume((prevVolume) => Math.min(prevVolume + 0.1, 1));
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                setVolume((prevVolume) => Math.max(prevVolume - 0.1, 0));
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                const newTime = Math.max(currentTime - 10, 0);
                setCurrentTime(newTime);
                reactPlayerRef.current.seekTo(newTime);
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                const newTime = Math.min(
                    currentTime + 10,
                    reactPlayerRef.current.getDuration()
                );
                setCurrentTime(newTime);
                reactPlayerRef.current.seekTo(newTime);
            }
        }
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };

    return (
        <div
            className="player-container"
            tabIndex={0}
            ref={playerRef}
            onKeyDown={handleKeyDown}
        >
            <ReactPlayer
                ref={reactPlayerRef}
                url={videoUrl}
                controls={true}
                width="1280px"
                height="720px"
                volume={volume}
                onProgress={handleProgress}
                config={{
                    file: {
                        tracks: [
                            {
                                kind: "subtitles",
                                src: subtitleUrl,
                                srcLang: "en",
                                default: true,
                            },
                        ],
                    },
                }}
            />
        </div>
    );
}

export default VideoPlayer;
