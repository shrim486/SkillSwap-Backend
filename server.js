const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const messageRoutes = require("./routes/messageRoutes");
const projectRoutes = require("./routes/projectRoutes");
const collaborationRoutes =
    require("./routes/collaborationRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/collaborations", collaborationRoutes);

app.get("/", (req, res) => {

    res.send(
        "SkillSwap Backend Running 🚀"
    );

});

const PORT =
    process.env.PORT || 5000;


// HTTP SERVER
const server =
    http.createServer(app);


// SOCKET.IO
const io = new Server(server, {

    cors: {
        origin: "*",
    },

});


// ONLINE USERS
const onlineUsers = {};


// SOCKET CONNECTION
io.on("connection", (socket) => {
// USER TYPING
socket.on("typing", (data) => {

    io.to(data.receiver).emit(

        "userTyping",

        {
            sender: data.sender
        }

    );

});


// USER STOPPED TYPING
socket.on("stopTyping", (data) => {

    io.to(data.receiver).emit(

        "userStoppedTyping",

        {
            sender: data.sender
        }

    );

});
    console.log(
        "A user connected:",
        socket.id
    );


    // JOIN ROOM
    socket.on(

        "joinRoom",

        (userId) => {

            socket.join(userId);

            onlineUsers[userId] =
                socket.id;

            io.emit(

                "onlineUsers",

                Object.keys(
                    onlineUsers
                )

            );

            console.log(
                `User ${userId} joined room`
            );

        }

    );


    // SEND MESSAGE
    socket.on(

        "sendMessage",

        (data) => {

            console.log(
                "Message received:",
                data
            );

            io.to(
                data.receiver
            ).emit(

                "receiveMessage",

                data

            );

        }

    );


    // DISCONNECT
    socket.on(

        "disconnect",

        () => {

            for (const userId in onlineUsers) {

                if (

                    onlineUsers[userId] ===
                    socket.id

                ) {

                    delete onlineUsers[userId];

                }

            }

            io.emit(

                "onlineUsers",

                Object.keys(
                    onlineUsers
                )

            );

            console.log(
                "User disconnected:",
                socket.id
            );

        }

    );

});


// START SERVER
server.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});