import "./title.css";
import { useContext } from "react";
import { ArcSelectionContext } from "../App";

function Title() {
    const { goHome, arcSelected, setGoHome, setShowVideoPlayer } =
        useContext(ArcSelectionContext);

    return (
        <>
            <div className="button-container">
                {goHome ? (
                    <button
                        className="title-container backToGallery"
                        onClick={() => {
                            setGoHome(false);
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
