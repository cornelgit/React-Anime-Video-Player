import "./arcinfo.css";

const ArcInfo = ({ index, onVideoSelect }) => {
    const arcDetails = [
        {
            description: "Sphere of Fear - Tron",
            episodeInfo: [
                "Episode 65 - All-Out War of Numbers! Yuma vs. Tron! Wondrous Duel in a Super-Strange Space!",
                "Episode 66 - Terrifying Duel! Arise, Hero of Bonds, ZEXAL!!!",
                "Episode 67 - Believe in Victory! Final Shining Draw!",
            ],
            videoPaths: [
                "Zexal/Tron/Zexal065.mp4",
                "Zexal/Tron/Zexal066.mp4",
                "Zexal/Tron/Zexal067.mp4",
            ],
            videoSubs: [
                "Zexal/Tron/Zexal065.vtt",
                "Zexal/Tron/Zexal066.vtt",
                "Zexal/Tron/Zexal067.vtt",
            ],
        },
        {
            description: "Shadows of Deception - Vector",
            episodeInfo: [
                "Episode 96 - The Villainous Vector - Battle at the Demonic Domain of Sargasso!",
                "Episode 97 - Sinister Shadows - Countdown to Defeat! The Terror of Deck Destruction",
                "Episode 98 - Shadows End - Break Through the Limit!! King of Wishes, Hope Ray Victory",
            ],
            videoPaths: [
                "Zexal/Vector/Zexal096.mp4",
                "Zexal/Vector/Zexal097.mp4",
                "Zexal/Vector/Zexal098.mp4",
            ],
            videoSubs: [
                "Zexal/Vector/Zexal096.vtt",
                "Zexal/Vector/Zexal097.vtt",
                "Zexal/Vector/Zexal098.vtt",
            ],
        },
        {
            description: "Mission: Astral World - Elifas",
            episodeInfo: [
                "Episode 119 - Transcendental State! The Threatening Double Rank-Up!!",
                "Episode 120 - Clash of the Two Kings! An Ancient Duel - Shark vs. Vector",
                "Episode 121 - Inheritor of the Light!! King of Wishes, Hope Roots",
            ],
            videoPaths: [
                "Zexal/Elifas/Zexal119.mp4",
                "Zexal/Elifas/Zexal120.mp4",
                "Zexal/Elifas/Zexal121.mp4",
            ],
            videoSubs: [
                "Zexal/Elifas/Zexal119.vtt",
                "Zexal/Elifas/Zexal120.vtt",
                "Zexal/Elifas/Zexal121.vtt",
            ],
        },
        {
            description: "Clash of Emperors - Nash",
            episodeInfo: [
                "Episode 136 - Sinister Memories! Nash vs. Vector, the Devil!!",
                "Episode 137 - Vector's Trifling! Bonds of Trapped Friendship!!",
                "Episode 138 - A Being of Chaos - Don Thousand Emerges!!",
            ],
            videoPaths: [
                "Zexal/Nash/Zexal136.mp4",
                "Zexal/Nash/Zexal137.mp4",
                "Zexal/Nash/Zexal138.mp4",
            ],
            videoSubs: [
                "Zexal/Nash/Zexal136.vtt",
                "Zexal/Nash/Zexal137.vtt",
                "Zexal/Nash/Zexal138.vtt",
            ],
        },
        {
            description: "The Source Code - Don Thousand",
            episodeInfo: [
                "Episode 139 - Cut Open a Path to the Future - Astral's Determination!!",
                "Episode 140 - Our Feelings are as One! The Dragon of Creation, Numeron Dragon",
                "Episode 141 - End of Chaos - Deadly Final Hope Sword Slash!!",
            ],
            videoPaths: [
                "Zexal/Don/Zexal139.mp4",
                "Zexal/Don/Zexal140.mp4",
                "Zexal/Don/Zexal141.mp4",
            ],
            videoSubs: [
                "Zexal/Don/Zexal139.vtt",
                "Zexal/Don/Zexal140.vtt",
                "Zexal/Don/Zexal141.vtt",
            ],
        },
    ];

    const handleButtonClick = (buttonIndex) => {
        const videoPath = arcDetails[index].videoPaths[buttonIndex];
        const subtitlePath = arcDetails[index].videoSubs[buttonIndex];
        onVideoSelect(videoPath, subtitlePath);
    };

    return (
        <div className="arc-info-container">
            <p className="arc-description">{arcDetails[index].description}</p>
            <div className="episode-container">
                <button onClick={() => handleButtonClick(0)}>
                    {arcDetails[index].episodeInfo[0]}
                </button>
                <button onClick={() => handleButtonClick(1)}>
                    {arcDetails[index].episodeInfo[1]}
                </button>
                <button onClick={() => handleButtonClick(2)}>
                    {arcDetails[index].episodeInfo[2]}
                </button>
            </div>
        </div>
    );
};

export default ArcInfo;
