import "./arcinfo.css";
import axios from "axios";
import arcdetails from "../data/arcdetails.json";

const ArcInfo = ({ index, onVideoSelect }) => {
    const arcTitles = Object.keys(arcdetails);
    const arcTitle = arcTitles[index];
    const arcEpisodes = arcdetails[arcTitle];

    const getEpisode = async (episode) => {
        try {
            const videoResponse = await axios.get(
                `http://localhost:3000/episode/${episode}/video`
            );
            const videoUrl = videoResponse.data.videoUrl;
            const subtitleResponse = await axios.get(
                `http://localhost:3000/episode/${episode}/subtitle`
            );
            const subtitleUrl = subtitleResponse.data.subtitleUrl;
            onVideoSelect(videoUrl, subtitleUrl);
        } catch (error) {
            console.error("Error fetching episode:", error);
            alert("Failed to load episode. Please try again.");
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
};

export default ArcInfo;
