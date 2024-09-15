import { useState, createContext } from "react";
import VideoPlayer from "./Components/videoplayer";
import Gallery from "./Components/gallery";
import Title from "./Components/title";
import Footer from "./Components/footer";
import LoadingSpinner from "./Components/loadingspinner";
import Frame from "./Components/frame";

export const ArcSelectionContext = createContext();

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
        setLoading(false);
    };

    return (
        <>
            <ArcSelectionContext.Provider
                value={{
                    goHome,
                    arcSelected,
                    setGoHome,
                    setShowVideoPlayer,
                    setLoading,
                    setArcSelected,
                    handleVideoSelect,
                }}
            >
                <Title />

                <Frame>
                    {!loading && !showVideoPlayer && <Gallery />}
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
            </ArcSelectionContext.Provider>
            <Footer />
        </>
    );
}

export default App;
