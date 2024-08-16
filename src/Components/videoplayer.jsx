import ReactPlayer from "react-player";
import "./videoplayer.css";

function VideoPlayer({ videoUrl, subtitleUrl }) {
    return (
        <div className="player-container">
            <ReactPlayer
                url={videoUrl}
                controls={true}
                width="1280px"
                height="720px"
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
