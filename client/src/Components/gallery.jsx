import { useEffect, useRef, useState, useMemo } from "react";
import "./gallery.css";
import card from "/Assets/VideoGallery/card.jpg";
import gal1 from "/Assets/VideoGallery/gal1.png";
import gal2 from "/Assets/VideoGallery/gal2.png";
import gal3 from "/Assets/VideoGallery/gal3.png";
import gal4 from "/Assets/VideoGallery/gal4.png";
import gal5 from "/Assets/VideoGallery/gal5.png";
import ArcInfo from "./arcinfo";
import { motion } from "framer-motion";

const imageVariants = {
    initial: {
        y: 500,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

const containerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const flipVariants = {
    front: {
        rotateY: 0,
    },
    back: {
        rotateY: 180,
    },
};

function Gallery({ onVideoSelect }) {
    const originalImages = [gal1, gal2, gal3, gal4, gal5];
    const memoizedImages = useMemo(() => originalImages, [originalImages]);
    const [images, setImages] = useState(memoizedImages);
    const imageRefs = useRef([]);
    const [flipIndex, setFlipIndex] = useState(null);
    const [showArcInfo, setShowArcInfo] = useState(false);

    useEffect(() => {
        imageRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.addEventListener("click", () => handleClick(index));
            }
        });

        return () => {
            imageRefs.current.forEach((ref, index) => {
                if (ref) {
                    ref.removeEventListener("click", () => handleClick(index));
                }
            });
        };
    }, []);

    const handleClick = (index) => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            const isCurrentCard = newImages[index] === card;

            if (isCurrentCard) {
                newImages[index] = memoizedImages[index];
                setFlipIndex(null);
                setShowArcInfo(false);
            } else {
                const cardIndex = newImages.findIndex((img) => img === card);
                if (cardIndex !== -1) {
                    newImages[cardIndex] = memoizedImages[cardIndex];
                }
                newImages[index] = card;
                setFlipIndex(index);
                setShowArcInfo(true);
            }
            return newImages;
        });
    };

    return (
        <div className="gallery-container">
            <motion.div
                className="gallery"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                {images.map((src, index) => (
                    <motion.div
                        className="image"
                        key={index}
                        variants={imageVariants}
                    >
                        <motion.div
                            className="image-wrapper"
                            initial="front"
                            animate={flipIndex === index ? "back" : "front"}
                            variants={flipVariants}
                            transition={{
                                duration: 0.5,
                            }}
                        >
                            <img
                                src={src}
                                alt={`Image ${index + 1}`}
                                ref={(el) => (imageRefs.current[index] = el)}
                                className="image-content"
                                style={{ cursor: "pointer" }}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
            {showArcInfo && flipIndex !== null && (
                <ArcInfo index={flipIndex} onVideoSelect={onVideoSelect} />
            )}
        </div>
    );
}

export default Gallery;
