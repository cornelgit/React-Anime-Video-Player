const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/videos", express.static(path.join(__dirname, "videos")));

app.get("/", (req, res) => {
    res.send(
        "Welcome to the Video API! Use /episode/:number to get video and subtitle links."
    );
});

function getEpisodePaths(episodeID, callback) {
    let videoPath = null;
    let subPath = null;

    switch (episodeID) {
        case "00":
            videoPath = "Tron/Zexal065.mp4";
            subPath = "Tron/Zexal065.vtt";
            break;
        case "01":
            videoPath = "Tron/Zexal066.mp4";
            subPath = "Tron/Zexal066.vtt";
            break;
        case "02":
            videoPath = "Tron/Zexal067.mp4";
            subPath = "Tron/Zexal067.vtt";
            break;
        case "10":
            videoPath = "Vector/Zexal096.mp4";
            subPath = "Vector/Zexal096.mp4";
            break;
        case "11":
            videoPath = "Vector/Zexal097.mp4";
            subPath = "Vector/Zexal097.mp4";
            break;
        case "12":
            videoPath = "Vector/Zexal098.mp4";
            subPath = "Vector/Zexal098.mp4";
            break;
        case "20":
            videoPath = "Elifas/Zexal119.mp4";
            subPath = "Elifas/Zexal119.vtt";
            break;
        case "21":
            videoPath = "Elifas/Zexal120.mp4";
            subPath = "Elifas/Zexal120.vtt";
            break;
        case "22":
            videoPath = "Elifas/Zexal121.mp4";
            subPath = "Elifas/Zexal121.vtt";
            break;
        case "30":
            videoPath = "Nash/Zexal136.mp4";
            subPath = "Nash/Zexal136.vtt";
            break;
        case "31":
            videoPath = "Nash/Zexal137.mp4";
            subPath = "Nash/Zexal137.vtt";
            break;
        case "32":
            videoPath = "Nash/Zexal138.mp4";
            subPath = "Nash/Zexal138.vtt";
            break;
        case "40":
            videoPath = "Don/Zexal139.mp4";
            subPath = "Don/Zexal139.vtt";
            break;
        case "41":
            videoPath = "Don/Zexal140.mp4";
            subPath = "Don/Zexal140.vtt";
            break;
        case "42":
            videoPath = "Don/Zexal141.mp4";
            subPath = "Don/Zexal141.vtt";
            break;
        default:
            return callback(null, null);
    }

    callback(videoPath, subPath);
}

app.get("/episode/:number", (req, res) => {
    const episodeID = req.params.number;

    getEpisodePaths(episodeID, (videoFile, subtitleFile) => {
        if (videoFile && subtitleFile) {
            res.json({
                video: `http://localhost:${PORT}/videos/Zexal/${videoFile}`,
                subtitle: `http://localhost:${PORT}/videos/Zexal/${subtitleFile}`,
            });
        } else {
            res.status(404).json({ error: "Episode not found" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//const episodeNumber = req.params.number.padStart(3, "0");
