import "./title.css";
import { useEffect, useState } from "react";

const buttonHoverSoundFile = "/Assets/Sounds/button-hover.mp3";

function Title({ goHome, setGoHome, setShowVideoPlayer, arcSelected }) {
    const [serverUp, setServerUp] = useState(false);

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
                    >
                        &#x2190; Back to arc selection
                    </button>
                ) : (
                    <button className="title-container">
                        {arcSelected
                            ? "Choose episode to play"
                            : "Select a Yu-Gi-Oh Zexal arc"}
                    </button>
                )}
            </div>
        </>
    );
}

export default Title;
