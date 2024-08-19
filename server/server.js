const express = require("express");
const cors = require("cors");
const path = require("path");
const episodes = require("./data/episodes.json");
const favicon = require("serve-favicon");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(favicon(path.join(__dirname, "./icon/favicon.ico")));
app.use("/videos", express.static(path.join(__dirname, "videos")));

app.get("/", (req, res) => {
    res.send(
        "Welcome to the Video API! Use /episode/:number to get video and subtitle links."
    );
});

function getEpisodePaths(episodeID) {
    return episodes.find((episode) => episode.id === episodeID) || null;
}

app.get("/episode/:number", (req, res) => {
    const episode = req.params.number;
    const paths = getEpisodePaths(episode);

    if (paths) {
        const baseUrl = `http://localhost:${PORT}/videos/Zexal/`;
        res.json({
            video: `${baseUrl}/${paths.video}`,
            subtitle: `${baseUrl}/${paths.subtitle}`,
        });
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
