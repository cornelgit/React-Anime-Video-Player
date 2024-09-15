import "./arcinfo.css";
import axios from "axios";
import arcdetails from "../data/arcdetails.json";
import { ArcSelectionContext } from "../App";
import { useContext } from "react";

function ArcInfo({ index }) {
    const { handleVideoSelect, setLoading } = useContext(ArcSelectionContext);
    const arcTitles = Object.keys(arcdetails);
    const arcTitle = arcTitles[index];
    const arcEpisodes = arcdetails[arcTitle];

    const getEpisode = async (episode) => {
        try {
            setLoading(true);
            const videoUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/episode/${episode}/video`;
            const subtitleResponse = await axios.get(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/episode/${episode}/subtitle`
            );
            const subtitleUrl = subtitleResponse.data.subtitleUrl;
            handleVideoSelect(videoUrl, subtitleUrl);
        } catch (error) {
            console.error("Error fetching episode:", error);
            alert(
                "Failed to load episode. Video server may be spinning up or is down. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const extractAndPadNumber = (inputString) => {
        const match = inputString.match(/\d+/);
        if (match) {
            let numberString = match[0];
            return numberString.padStart(3, "0");
        }
        return null;
    };

    const handleEpisodeClick = (episode) => {
        const paddedEpisode = extractAndPadNumber(episode);
        if (paddedEpisode) {
            getEpisode(paddedEpisode);
        }
    };

    return (
        <div className="arc-info-container">
            <p className="arc-description">{arcTitle}</p>
            <div className="episode-container">
                {arcEpisodes.map((episode, index) => (
                    <button
                        key={index}
                        onClick={() => handleEpisodeClick(episode)}
                    >
                        {episode}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ArcInfo;
