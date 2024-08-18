import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // Add MIME types for video and subtitle files
        mime: {
            "video/mp4": ["mp4"],
            "text/vtt": ["vtt"], // Add this line for .vtt files
        },
    },
});
