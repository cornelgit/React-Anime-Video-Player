import { useState } from "react";
import VideoPlayer from "./Components/videoplayer";
import Gallery from "./Components/gallery";
import Title from "./Components/title";
import Footer from "./Components/footer";
import LoadingSpinner from "./Components/loadingspinner";
import Frame from "./Components/frame";

function App() {
    const [videoUrl, setVideoUrl] = useState("");
    const [subtitleUrl, setSubtitleUrl] = useState("");
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [goHome, setGoHome] = useState(false);
    const [loading, setLoading] = useState(false);
    const [arcSelected, setArcSelected] = useState(false);

    const handleVideoSelect = (videoPath, subtitlePath) => {
        setGoHome(true);
        setShowVideoPlayer(false);
        setVideoUrl(videoPath);
        setSubtitleUrl(subtitlePath);
        setShowVideoPlayer(true);
        setShowVideoPlayer(true);
        setLoading(false);
    };

    return (
        <>
            <Title
                goHome={goHome}
                setGoHome={setGoHome}
                setShowVideoPlayer={setShowVideoPlayer}
                arcSelected={arcSelected}
            />
            <Frame>
                {!loading && !showVideoPlayer && (
                    <Gallery
                        onVideoSelect={handleVideoSelect}
                        setLoading={setLoading}
                        setArcSelected={setArcSelected}
                    />
                )}
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    showVideoPlayer && (
                        <div className="player-container">
                            <VideoPlayer
                                videoUrl={videoUrl}
                                subtitleUrl={subtitleUrl}
                            />
                        </div>
                    )
                )}
            </Frame>
            <Footer />
        </>
    );
}

export default App;
