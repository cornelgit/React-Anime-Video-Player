import "./title.css";
import { useEffect, useState } from "react";

const buttonHoverSoundFile = "/Assets/Sounds/button-hover.mp3";

function Title({
    goHome,
    setGoHome,
    setShowVideoPlayer,
    soundOn,
    handleSoundToggle,
}) {
    const [serverUp, setServerUp] = useState(false);

    const playSound = (soundFile) => {
        if (soundOn) {
            const audio = new Audio(soundFile);
            audio.volume = 0.25;
            audio.play();
        }
    };

    function pingServer(url) {
        fetch(url, { method: "GET", mode: "no-cors" })
            .then((response) => {
                //console.log("Server is online");
                setServerUp(true);
            })
            .catch((error) => {
                console.log("Server is offline or unreachable");
                setServerUp(false);
            });
    }

    useEffect(() => {
        pingServer("https://react-anime-video-player.onrender.com");
    }, []);

    return (
        <>
            <div className="button-container">
                {goHome ? (
                    <button
                        className="title-container backToGallery"
                        onClick={() => {
                            setGoHome(!goHome);
                            setShowVideoPlayer(false);
                        }}
                        onMouseEnter={() =>
                            soundOn ? playSound(buttonHoverSoundFile) : null
                        }
                    >
                        &#x2190; Back to arc selection
                    </button>
                ) : (
                    <button className="title-container">
                        Select a Yu-Gi-Oh Zexal arc
                    </button>
                )}
                <button className="sound-button" onClick={handleSoundToggle}>
                    Sounds {soundOn ? "ON" : "OFF"}
                </button>
            </div>
        </>
    );
}

export default Title;
