import { useState } from "react";
import VideoPlayer from "./Components/videoplayer";
import Gallery from "./Components/gallery";
import Title from "./Components/title";
import Footer from "./Components/footer";
import LoadingSpinner from "./Components/loadingspinner";

function App() {
    const [videoUrl, setVideoUrl] = useState("");
    const [subtitleUrl, setSubtitleUrl] = useState("");
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [goHome, setGoHome] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleVideoSelect = (videoPath, subtitlePath) => {
        setLoading(true);
        setGoHome(true);
        setVideoUrl(videoPath);
        setSubtitleUrl(subtitlePath);
        setShowVideoPlayer(false);
        setLoading(false);
        setShowVideoPlayer(true);
    };

    return (
        <>
            <Title
                goHome={goHome}
                setGoHome={setGoHome}
                setShowVideoPlayer={setShowVideoPlayer}
            />
            {!loading && !showVideoPlayer && (
                <Gallery onVideoSelect={handleVideoSelect} loading={loading} />
            )}
            {loading ? (
                <LoadingSpinner />
            ) : (
                showVideoPlayer && (
                    <div
                        className="player-container"
                        style={{ position: "relative" }}
                    >
                        <VideoPlayer
                            videoUrl={videoUrl}
                            subtitleUrl={subtitleUrl}
                        />
                    </div>
                )
            )}
            <Footer />
        </>
    );
}

export default App;
