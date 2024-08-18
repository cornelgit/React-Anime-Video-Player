import "./arcinfo.css";
import axios from "axios"; // Import Axios

const ArcInfo = ({ index, onVideoSelect }) => {
    const getEpisode = async (episodeNumber) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/episode/${episodeNumber}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;

            console.log(`Data: ${JSON.stringify(data)}`);
            console.log(`Video data: ${data.video}`);
            console.log(`Subtitle data: ${data.subtitle}`);
            const subs = "http://localhost:3000/videos/Zexal/Zexal065.vtt";
            onVideoSelect(data.video, data.subtitle);
        } catch (error) {
            console.error("Error fetching episode:", error);
        }
    };

    const handleButtonClick = () => {
        getEpisode(65);
    };

    return (
        <div className="arc-info-container">
            <p className="arc-description">Episode 65</p>
            <div className="episode-container">
                <button onClick={handleButtonClick}>65</button>
                <button onClick={handleButtonClick}>65</button>
                <button onClick={handleButtonClick}>65</button>
            </div>
        </div>
    );
};

export default ArcInfo;
