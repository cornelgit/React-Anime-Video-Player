import "./arcinfo.css";
import axios from "axios";

const ArcInfo = ({ index, onVideoSelect }) => {
    function getEpisodeDetails(episodeID) {
        let episodeAndInfo = null;
        switch (episodeID) {
            case "00":
                episodeAndInfo =
                    "Episode 65 - All-Out War of Numbers! Yuma vs. Tron! Wondrous Duel in a Super-Strange Space!";
                break;
            case "01":
                episodeAndInfo =
                    "Episode 66 - Terrifying Duel! Arise, Hero of Bonds, ZEXAL!!!";
                break;
            case "02":
                episodeAndInfo =
                    "Episode 67 - Believe in Victory! Final Shining Draw!";
                break;
            case "10":
                episodeAndInfo =
                    "Episode 96 - The Villainous Vector - Battle at the Demonic Domain of Sargasso!";
                break;
            case "11":
                episodeAndInfo =
                    "Episode 97 - Sinister Shadows - Countdown to Defeat! The Terror of Deck Destruction";
                break;
            case "12":
                episodeAndInfo =
                    "Episode 98 - Shadows End - Break Through the Limit!! King of Wishes, Hope Ray Victory";
                break;
            case "20":
                episodeAndInfo =
                    "Episode 119 - Transcendental State! The Threatening Double Rank-Up!!";
                break;
            case "21":
                episodeAndInfo =
                    "Episode 120 - Clash of the Two Kings! An Ancient Duel - Shark vs. Vector";
                break;
            case "22":
                episodeAndInfo =
                    "Episode 121 - Inheritor of the Light!! King of Wishes, Hope Roots";
                break;
            case "30":
                episodeAndInfo =
                    "Episode 136 - Sinister Memories! Nash vs. Vector, the Devil!!";
                break;
            case "31":
                episodeAndInfo =
                    "Episode 137 - Vector's Trifling! Bonds of Trapped Friendship!!";
                break;
            case "32":
                episodeAndInfo =
                    "Episode 138 - A Being of Chaos - Don Thousand Emerges!!";
                break;
            case "40":
                episodeAndInfo =
                    "Episode 139 - Cut Open a Path to the Future - Astral's Determination!!";
                break;
            case "41":
                episodeAndInfo =
                    "Episode 140 - Our Feelings are as One! The Dragon of Creation, Numeron Dragon";
                break;
            case "42":
                episodeAndInfo =
                    "Episode 141 - End of Chaos - Deadly Final Hope Sword Slash!!";
                break;
            default:
                episodeAndInfo = null;
        }

        return episodeAndInfo;
    }

    const getEpisode = async (episodeID) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/episode/${episodeID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data;
            onVideoSelect(data.video, data.subtitle);
        } catch (error) {
            console.error("Error fetching episode:", error);
        }
    };

    return (
        <div className="arc-info-container">
            <p className="arc-description">Title</p>
            <div className="episode-container">
                <button onClick={() => getEpisode(index + "0")}>
                    {getEpisodeDetails(index + "0")}
                </button>
                <button onClick={() => getEpisode(index + "1")}>
                    {getEpisodeDetails(index + "1")}
                </button>
                <button onClick={() => getEpisode(index + "2")}>
                    {getEpisodeDetails(index + "2")}
                </button>
            </div>
        </div>
    );
};

export default ArcInfo;
