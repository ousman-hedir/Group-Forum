const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
	postAnswer,
	getAnswerByQuestionId,
} = require("../controller/answersController");

router.post("/save-answer/:questionId", postAnswer);
router.get("/get-answers/:questionId", getAnswerByQuestionId);
module.exports = router;
