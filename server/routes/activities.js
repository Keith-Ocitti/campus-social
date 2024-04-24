const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/Activities");

router.route("/makePost").post(makePost);
router.route("/makeComment").post(makeComment);
router.route("/createResource").post(createResource);
router.route("/postEvents").post(postEvents);
router.route("/getPosts").get(getPosts);
router.route("/getTherapists").get(getTherapists);
router.route("/getComments").post(getComments);
router.route("/getClients").get(getClients);
router.route("/getEvents").get(getEvents);
router.route("/getResources").get(getResource);

module.exports = router;
