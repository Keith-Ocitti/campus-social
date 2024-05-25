const Post = require("../models/Posts");
const Room = require("../models/Room");
const Resource = require("../models/Resource");
const Event = require("../models/Events");
const Comment = require("../models/Comments");
const User = require("../models/User");
const Message = require("../models/Message");
const Clients = require("../models/Clients");

const getTherapists = async (req, res) => {
  console.log("Thera server has been hit");
  const { id } = req.params;
  const userId = id;
  console.log(userId);
  try {
    let therapists = await User.find({ post: "therapist" });
    let allMessages = await Message.find();
    let result = therapists.map((therapist) => {
      return {
        therapistData: therapist,
        messages: allMessages.filter(
          (msg) =>
            ([msg.to].toString() === [therapist._id].toString() &&
              [msg.createdBy].toString() === userId) ||
            ([msg.createdBy].toString() === [therapist._id].toString() &&
              [msg.to].toString() === userId)
        ),
      };
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getClients = async (req, res) => {
  try {
    console.log("Client server has been hit");
    const { id } = req.params;
    const userId = id;
    console.log(userId);

    let allMessages = await Message.find();
    const clients = await Clients.find({ therapistId: userId });
    // if (clients.length < 1) {
    //   res.send([]);
    // }
    console.log(clients);
    let count = 1;
    let result = clients.map((client) => {
      return {
        client: `Client ${count++}`,
        id: client.clientId,
        clientMessages: allMessages.filter(
          (msg) =>
            ([msg.to].toString() === userId &&
              [msg.createdBy].toString() === [client.clientId].toString()) ||
            ([msg.to].toString() === client.clientId &&
              [msg.createdBy].toString() === userId)
        ),
      };
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    return;
  }
};

const makePost = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { body } = req.body;
    const post = await Post.create({
      body,
      room: "65faef15f6903a53d3a10f40",
      createdBy: userId,
    });

    res.status(201).send(post);
  } catch (error) {
    return console.log(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const comments = await Comment.find();
    let finalPosts = posts.map((post) => {
      return {
        post,
        postComments: comments.filter(
          (item) => [item.post].toString() === [post._id].toString()
        ),
      };
    });
    res.status(200).send(finalPosts);
  } catch (error) {
    console.log(error);
    return;
  }
};

const makeComment = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { postId, body } = req.body;
    const comment = await Comment.create({
      body,
      post: postId,
      createdBy: userId,
    });
    res.status(201).send(comment);
  } catch (error) {
    res.send(error);
    console.log(error);
    return;
  }
};

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const comments = await Comment.find({ post: postId });
    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
    res.send(error);
    return;
  }
};

const createResource = async (req, res, next) => {
  try {
    const { title, body, userId } = req.body;

    await Resource.create({ title, body, createdBy: userId });
    res.status(201).send("successful");
  } catch (error) {
    console.log(error);
    return;
  }
};

const getResource = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).send(resources);
  } catch (error) {
    console.log(error);
    res.send(error);
    return;
  }
};

const postEvents = async (req, res, next) => {
  try {
    console.log("Server has been hit!");
    const { title, description, location, date, activityTime, userId } =
      req.body;
    const event = await Event.create({
      title,
      description,
      location,
      createdBy: userId,
      date,
      activityTime,
    });
    res.status(201).send(event);
  } catch (error) {
    console.log(error);
    return;
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  makePost,
  makeComment,
  createResource,
  postEvents,
  getPosts,
  getTherapists,
  getComments,
  getClients,
  getEvents,
  getResource,
};
