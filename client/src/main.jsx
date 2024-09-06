import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

createRoot(document.getElementById("root")).render(<App />);
