import ReactPlayer from "react-player";
import { useState, useEffect, useRef, useCallback } from "react";
import "./videoplayer.css";

function VideoPlayer({ videoUrl, subtitleUrl }) {
    const playerRef = useRef(null);
    const reactPlayerRef = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);
    const [volumePercentage, setVolumePercentage] = useState(50);
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

    const handleKeyDown = useCallback(
        (event) => {
            if (reactPlayerRef.current) {
                if (event.key === " ") {
                    event.preventDefault();
                    if (reactPlayerRef.current.getInternalPlayer().paused) {
                        reactPlayerRef.current.getInternalPlayer().play();
                    } else {
                        reactPlayerRef.current.getInternalPlayer().pause();
                    }
                }

                if (event.key === "Enter") {
                    event.preventDefault();
                    const playerElement = reactPlayerRef.current.wrapper;

                    if (!document.fullscreenElement) {
                        playerElement
                            .requestFullscreen()
                            .then(() => {
                                playerRef.current.focus();
                            })
                            .catch((err) => {
                                console.error(
                                    "Error attempting to enable fullscreen mode:",
                                    err
                                );
                            });
                    } else {
                        document.exitFullscreen().catch((err) => {
                            console.error(
                                "Error attempting to exit fullscreen mode:",
                                err
                            );
                        });
                    }
                }

                if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setVolume((prevVolume) => {
                        const newVolume = Math.min(prevVolume + 0.1, 1);
                        setVolumePercentage(Math.round(newVolume * 100));
                        setShowVolume(true);
                        return newVolume;
                    });
                } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setVolume((prevVolume) => {
                        const newVolume = Math.max(prevVolume - 0.1, 0);
                        setVolumePercentage(Math.round(newVolume * 100));
                        setShowVolume(true);
                        return newVolume;
                    });
                }

                const duration = reactPlayerRef.current.getDuration();
                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    const newTime = Math.max(currentTime - 10, 0);
                    reactPlayerRef.current.seekTo(newTime);
                    setCurrentTime(newTime);
                }

                if (event.key === "ArrowRight") {
                    event.preventDefault();
                    const newTime = Math.min(currentTime + 10, duration || 0);
                    reactPlayerRef.current.seekTo(newTime);
                    setCurrentTime(newTime);
                }
            }
        },
        [currentTime, volume]
    );

    const handleSeek = (seconds) => {
        setCurrentTime(seconds);
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };

    useEffect(() => {
        if (showVolume) {
            const timer = setTimeout(() => {
                setShowVolume(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showVolume]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className="player-container"
            tabIndex={0}
            ref={playerRef}
            style={{ position: "relative" }}
        >
            <ReactPlayer
                ref={reactPlayerRef}
                url={videoUrl}
                controls={true}
                width="100%"
                height="100%"
                volume={volume}
                onProgress={handleProgress}
                onSeek={handleSeek}
                config={{
                    file: {
                        attributes: { crossOrigin: "anonymous" },
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
            {showVolume && (
                <div className="volume-display" aria-live="polite">
                    Volume: {volumePercentage}%
                </div>
            )}
        </div>
    );
}

export default VideoPlayer;
