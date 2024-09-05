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
    const [soundOn, setSoundOn] = useState(false);

    const handleVideoSelect = (videoPath, subtitlePath) => {
        setLoading(true);
        setGoHome(true);
        setVideoUrl(videoPath);
        setSubtitleUrl(subtitlePath);
        setShowVideoPlayer(false);
        setLoading(false);
        setShowVideoPlayer(true);
    };

    const handleSoundToggle = () => {
        setSoundOn((prevSoundOn) => !prevSoundOn);
    };

    return (
        <>
            <Title
                goHome={goHome}
                setGoHome={setGoHome}
                setShowVideoPlayer={setShowVideoPlayer}
                soundOn={soundOn}
                handleSoundToggle={handleSoundToggle}
            />
            <Frame>
                {!loading && !showVideoPlayer && (
                    <Gallery
                        onVideoSelect={handleVideoSelect}
                        loading={loading}
                        soundOn={soundOn}
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
