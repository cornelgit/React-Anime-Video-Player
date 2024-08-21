import { useState } from "react";
import VideoPlayer from "./Components/videoplayer";
import Gallery from "./Components/gallery";
import Header from "./Components/header";
import Footer from "./Components/footer";
import LoadingSpinner from "./Components/loadingspinner";

function App() {
    const [videoUrl, setVideoUrl] = useState("");
    const [subtitleUrl, setSubtitleUrl] = useState("");
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [showHome, setShowHome] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleVideoSelect = (videoPath, subtitlePath) => {
        setLoading(true);
        setShowHome(true);
        setVideoUrl(videoPath);
        setSubtitleUrl(subtitlePath);
        setShowVideoPlayer(false);

        setTimeout(() => {
            console.log("Loading finished");
            setLoading(false);
            setShowVideoPlayer(true);
        }, 2000);
    };

    const handleBackToGallery = () => {
        setShowVideoPlayer(false);
        setShowHome(false);
    };

    return (
        <>
            <Header
                showHome={showHome}
                showVideoPlayer={showVideoPlayer}
                onBackToGallery={handleBackToGallery}
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
