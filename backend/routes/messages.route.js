const { addMessage, getMessages } = require("../controllers/message.controller.js");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;