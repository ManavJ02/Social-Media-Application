// Importing required modules and dependencies
import express from "express"; // Framework to create the server and handle HTTP requests
import dotenv from "dotenv"; // Module to load envionment variables from a .env file
import connectDB from "./db/connectDB.js"; // Custom function to establish a connection to the database
import cookieParser from "cookie-parser"; // Middleware to parse cookies from incoming requests
import userRoutes from "./routes/userRoutes.js"; // Router for handling user-related endpoints
import postRoutes from "./routes/postRoutes.js"; // Router for handling post-related endpoints
import messageRoutes from "./routes/messageRoutes.js"; // Router for handling message-related endpoints
import { v2 as cloudinary } from "cloudinary"; // Cloudinary SDK for managing media files
import { app, server } from "./socket/socket.js"; // WebSocket setup for real-time communication (e.g., chat or notification)

// Load environment variables from the .env file 
dotenv.config(); // Makes process.env variables available in the application

// Connect to the database
connectDB(); // Initializes the connection to the MongoDB database (defined in ConnectDB.js)

// Define the port where the server will listen for requests
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000

// Configure Cloundinary for media uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret
});

// Use middlewares to process incoming data
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser()); // To parse cookies for authentication, session management, etc.

// Define routes for different features of the application
app.use("/api/users", userRoutes); // Handles all user-related operations like login, logout, signup or profile updates
app.use("/api/posts", postRoutes); // Handles all post-related features like creating, deleting or retrieving posts
app.use("/api/messages", messageRoutes); // Handles messaging-related operations like spending or fetching messages

// Start the server and listen for incoming requests
server.listen(PORT, () => 
  console.log(`Server listening at http://localhost:${PORT}`) // Logs the server's running status with the port number
);
