const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
	postQuestion,
	getAllQuestions,
	getQuestionById,
} = require("../controller/questionController");

router.get("/all-questions", getAllQuestions);
router.post("/save-question", postQuestion);
router.get("/single-question/:questionId", getQuestionById);
router.get("/get-answers/:questionId");
module.exports = router;
