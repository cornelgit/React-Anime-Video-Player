import express from "express";
import cors from "cors";
import path from "path";
import favicon from "serve-favicon";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { readFile } from "fs/promises";

dotenv.config(); // Load environment variables from .env file

const app = express();
let episodesCache = []; // Variable to store cached episodes data

//CORS configuration
app.use(
    cors({
        origin: "http://localhost:5173", // Allow requests from this origin
        methods: ["GET", "HEAD", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

const PORT = process.env.PORT || 3000;

app.use(favicon(path.join(process.cwd(), "icon/favicon.ico"))); // Use process.cwd() for absolute path

// Serve static files from the 'videos' directory
app.use("/videos", express.static(path.join(process.cwd(), "videos"))); // Use process.cwd() for absolute path

// Where??????
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// Middleware to block non-GET and non-OPTIONS requests
app.use((req, res, next) => {
    if (
        req.method !== "GET" &&
        req.method !== "HEAD" &&
        req.method !== "OPTIONS"
    ) {
        res.status(405).json({ error: "Method Not Allowed" });
    } else {
        next();
    }
});

// Load episodes data into cache when the server starts
async function loadEpisodes() {
    try {
        const data = await readFile(
            new URL("./data/episodes.json", import.meta.url),
            "utf-8"
        );
        episodesCache = JSON.parse(data);
    } catch (error) {
        console.error("Failed to load episodes:", error);
    }
}

// Call the load function to populate the cache
loadEpisodes();

app.get("/", (req, res) => {
    res.send(
        "Welcome to the Video API! Use /episode/:number/video to get video file or /episode/:number/subtitle for sub."
    );
});

// Function to get episode paths from cached data
function getEpisodePaths(episodeID) {
    return episodesCache.find((episode) => episode.id === episodeID) || null;
}

// Handle preflight requests for the video endpoint
app.options("/episode/:number/video", cors());

// Endpoint to get video file
app.get("/episode/:number/video", (req, res) => {
    const episodeID = req.params.number;
    const paths = getEpisodePaths(episodeID);

    if (paths) {
        const videoUrl = `https://${process.env.CLOUDFRONT_NAME}/${paths.video}`;
        res.json({ videoUrl });
    } else {
        res.status(404).json({ error: "Episode not found" });
    }
});

// Endpoint to get subtitle file
app.get("/episode/:number/subtitle", (req, res) => {
    const episodeID = req.params.number;
    const paths = getEpisodePaths(episodeID);

    if (paths) {
        const subtitleUrl = `https://${process.env.CLOUDFRONT_NAME}/${paths.subtitle}`;
        res.json({ subtitleUrl });
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

//SIG INT - gracefully close on unexpected event
//https://www.perplexity.ai/search/git-bash-kill-a-process-SiZpHNgrQ5uQ6GuoTHzqcQ
