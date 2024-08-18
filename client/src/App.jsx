import { useState } from "react";
import VideoPlayer from "./Components/videoplayer";
import Gallery from "./Components/gallery";
import Header from "./Components/header";
import Footer from "./Components/footer";

function App() {
    const [videoUrl, setVideoUrl] = useState("");
    const [subtitleUrl, setSubtitleUrl] = useState("");
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [showHome, setShowHome] = useState(false);

    const handleVideoSelect = (videoPath, subtitlePath) => {
        setVideoUrl(videoPath);
        setSubtitleUrl(subtitlePath);
        setShowVideoPlayer(true);
        setShowHome(true);
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
            {!showVideoPlayer && <Gallery onVideoSelect={handleVideoSelect} />}
            {showVideoPlayer && (
                <VideoPlayer videoUrl={videoUrl} subtitleUrl={subtitleUrl} />
            )}
            <Footer />
        </>
    );
}

export default App;

App.js;
