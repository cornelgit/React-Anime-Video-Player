import "./header.css";

function Header({ goHome, setGoHome, setShowVideoPlayer }) {
    return (
        <>
            {goHome ? (
                <button
                    className="header-container backToGallery"
                    onClick={() => {
                        setGoHome(!goHome);
                        setShowVideoPlayer(false);
                    }}
                >
                    &#x2190; Back to arc selection
                </button>
            ) : (
                <button className="header-container">
                    Select a Yu-Gi-Oh Zexal arc
                </button>
            )}
        </>
    );
}

export default Header;
