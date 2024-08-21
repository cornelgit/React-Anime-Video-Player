import { useCallback, useEffect } from "react";
import { debounce } from "lodash";
import "./header.css";

function Header({ showHome, onBackToGallery }) {
    const handleBackToGallery = useCallback(
        debounce(() => {
            onBackToGallery();
        }, 300),
        [onBackToGallery]
    );

    useEffect(() => {
        return () => {
            handleBackToGallery.cancel();
        };
    }, [handleBackToGallery]);

    return (
        <>
            {showHome ? (
                <button
                    className="header-container backToGallery"
                    onClick={handleBackToGallery}
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
