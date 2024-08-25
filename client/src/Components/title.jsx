import "./title.css";

function Title({ goHome, setGoHome, setShowVideoPlayer }) {
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
                        Select a Yu-Gi-Oh Zexal arc
                    </button>
                )}
            </div>
        </>
    );
}

export default Title;
