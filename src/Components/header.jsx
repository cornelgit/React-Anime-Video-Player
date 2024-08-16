import "./header.css";

function Header({ showHome, onBackToGallery }) {
    return (
        <>
            {showHome ? (
                <button className="header-container" onClick={onBackToGallery}>
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
