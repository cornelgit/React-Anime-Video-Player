import "./title.css";
import { useContext } from "react";
import { ArcSelectionContext } from "../App";

function Title() {
    // const [serverUp, setServerUp] = useState(false);

    // function pingServer(url) {
    //     fetch(url, { method: "GET", mode: "no-cors" })
    //         .then((response) => {
    //             setServerUp(true);
    //         })
    //         .catch((error) => {
    //             console.log("Server is offline or unreachable");
    //             setServerUp(false);
    //         });
    // }

    // useEffect(() => {
    //     pingServer("https://react-anime-video-player.onrender.com");
    // }, []);

    const { goHome, arcSelected, setGoHome, setShowVideoPlayer } =
        useContext(ArcSelectionContext);

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
