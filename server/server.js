require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db/connectDB");
const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activities");
const authentication = require("./middleware/authentication");
const path = require("path");
const Decoder = require("./utils/decoder");
const Post = require("./models/Posts");
const Message = require("./models/Message");
const Comment = require("./models/Comments");
const Clients = require("./models/Clients");

const server = http.createServer(app);
const port = 5000;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8082",
  },
});
const cors = require("cors");
const { log } = require("console");

// middleware
app.use(cors());
app.use(express.json());
// app.use(session);
app.use("/api/v1", authRoutes);
app.use("/api/v1", authentication, activityRoutes);

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  const id = socket.handshake.auth.userId;
  // console.log({ id, username });
  console.log({ user: id });
  socket.join(id);
  socket.join("65faef15f6903a53d3a10f40");
  next();
});

io.on("connection", (socket) => {
  socket.on("postMessage", async (data, callback) => {
    // console.log("server has been hit");
    const { token, body } = data;

    let payload = await Decoder(token);
    const { userId } = payload;
    roomId = "65faef15f6903a53d3a10f40";
    result = await Post.create({
      body,
      createdBy: userId,
      room: roomId,
    });
    callback(result);
    io.to(roomId).emit("post", result, socket.id);
  });

  socket.on("comment", async (data, callback) => {
    roomId = "65faef15f6903a53d3a10f40";
    const { postId, body, token } = data;
    let payload = await Decoder(token);
    const { userId } = payload;
    const comment = await Comment.create({
      body,
      post: postId,
      createdBy: userId,
    });
    callback(comment);
    io.to(roomId).emit("comment", comment);
  });

  socket.on("client-message", async (data, callback) => {
    const { body, to, token } = data;
    let payload = await Decoder(token);
    const { userId } = payload;
    let msg = await Message.create({ body, to, createdBy: userId });
    let newMsg = { msg, also: userId };
    let client = await Clients.find({ clientId: userId });
    if (client.length < 1) {
      await Clients.create({ clientId: userId, therapistId: to });
    }

    if (msg) {
      io.to(to).to(userId).emit("message", newMsg);
      callback("got it");
    }
  });

  socket.on("therapist-message", async (data, callback) => {
    const { body, to, token } = data;
    let payload = await Decoder(token);
    const { userId } = payload;
    let msg = await Message.create({ body, to, createdBy: userId });
    let newMsg = { msg, also: userId };
    if (msg) {
      io.to(to).to(userId).emit("message", newMsg);
      callback("got it");
    }
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}.............`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
