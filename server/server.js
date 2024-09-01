import express from "express";
import cors from "cors";
import path from "path";
import favicon from "serve-favicon";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import https from "https";

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

// Rate limiter - per user
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
    res.send("Welcome to the Anime Video API! Server is running...");
});

// Function to get episode paths from cached data
function getEpisodePaths(episodeID) {
    return episodesCache.find((episode) => episode.id === episodeID) || null;
}

// Handle preflight requests for the video endpoint
app.options("/episode/:number/video", cors());

// Endpoint to stream video file from CloudFront
app.get("/episode/:number/video", (req, res) => {
    const episodeID = req.params.number;
    const paths = getEpisodePaths(episodeID);

    if (paths) {
        const videoUrl = `https://${process.env.CLOUDFRONT_NAME}/${paths.video}`;

        // Get the range header from the request
        const range = req.headers.range;

        if (!range) {
            res.status(416).send("Range Not Specified");
            return;
        }

        // Fetch the video stream with the specified range from CloudFront
        https
            .get(videoUrl, { headers: { Range: range } }, (videoStream) => {
                const { statusCode, headers } = videoStream;

                if (statusCode === 200 || statusCode === 206) {
                    // Set the appropriate headers for the response
                    res.writeHead(statusCode, {
                        "Content-Range": headers["content-range"],
                        "Accept-Ranges": "bytes",
                        "Content-Length": headers["content-length"],
                        "Content-Type": headers["content-type"],
                    });

                    // Pipe the video stream to the response
                    videoStream.pipe(res);
                } else {
                    res.status(statusCode).send("Error fetching video");
                }
            })
            .on("error", (err) => {
                console.error("Error streaming video:", err);
                res.status(500).json({ error: "Error streaming video" });
            });
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

// Graceful shutdown on SIGINT
process.on("SIGINT", async () => {
    console.log("Received SIGINT. Shutting down gracefully...");

    server.close(() => {
        console.log("Closed out remaining connections.");
        process.exit(0); // Exit the process
    });

    // If the server takes too long to close, force shutdown after a timeout
    setTimeout(() => {
        console.error("Forcing shutdown...");
        process.exit(1); // Exit with failure
    }, 10000); // 10 seconds timeout
});
