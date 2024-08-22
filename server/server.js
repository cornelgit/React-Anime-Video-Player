import express from "express";
import cors from "cors";
import path from "path";
import episodes from "./data/episodes.json" assert { type: "json" }; // Use assert for JSON imports
import favicon from "serve-favicon";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();

// CORS configuration
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: ["GET", "HEAD", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

const PORT = process.env.PORT || 3000;

app.use(favicon(path.join(process.cwd(), "icon/favicon.ico"))); // Use process.cwd() for absolute path

// Serve static files from the 'videos' directory
app.use("/videos", express.static(path.join(process.cwd(), "videos"))); // Use process.cwd() for absolute path

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.get("/", (req, res) => {
    res.send(
        "Welcome to the Video API! Use /episode/:number/video to get video file or /episode/:number/subtitle for sub."
    );
});

function getEpisodePaths(episodeID) {
    return episodes.find((episode) => episode.id === episodeID) || null;
}

// Handle preflight requests for the video endpoint
app.options("/episode/:number/video", cors());

// Endpoint to get video file
app.get("/episode/:number/video", (req, res) => {
    const episodeID = req.params.number;
    const paths = getEpisodePaths(episodeID);

    if (paths) {
        // Construct the full S3 URL for the video
        const videoUrl = `https://${process.env.CLOUDFRONT_NAME}/${paths.video}`;
        res.json({ videoUrl }); // Return the video URL
    } else {
        res.status(404).json({ error: "Episode not found" });
    }
});

// Endpoint to get subtitle file
app.get("/episode/:number/subtitle", (req, res) => {
    const episodeID = req.params.number;
    const paths = getEpisodePaths(episodeID);

    if (paths) {
        // Construct the full S3 URL for the subtitle
        const subtitleUrl = `https://${process.env.CLOUDFRONT_NAME}/${paths.subtitle}`;
        res.json({ subtitleUrl }); // Return the subtitle URL
    } else {
        res.status(404).json({ error: "Episode not found" });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
