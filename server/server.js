const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Serve video files from the 'videos' directory
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Add a route for the root URL
app.get("/", (req, res) => {
    res.send(
        "Welcome to the Video API! Use /episode/:number to get video and subtitle links."
    );
});

// Endpoint to get video and subtitle for a specific episode
app.get("/episode/:number", (req, res) => {
    const episodeNumber = req.params.number.padStart(3, "0");
    const videoFile = `Zexal/Zexal${episodeNumber}.mp4`;
    const subtitleFile = `Zexal/Zexal${episodeNumber}.vtt`;

    res.json({
        video: `http://localhost:${PORT}/videos/${videoFile}`,
        subtitle: `http://localhost:${PORT}/videos/${subtitleFile}`,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
