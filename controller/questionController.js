const dbConnection = require("../db/dbConfig");

// Function to post a question
async function postQuestion(req, res) {
	const { title, description, questionId } = req.body;

	const { user, body } = req;

	if ((!title || !description || !user.userid)) {
		return res.status(400).send("Please provide all necessary information");
	}

	try {
		// Get user information from the JWT token
		const user_id_from_token = req.user.userid;
		const username = req.user.username;

		const [insertResult] = await dbConnection.query(
			"INSERT INTO questions (userid, questionid, title, description) VALUES (?, ?, ?, ?)",
			[user_id_from_token, questionId, title, description]
		);

		const insertedQuestionId = insertResult.insertId;

		const email = req.user.email;

		return res.status(201).json({
			message: "Question posted successfully",
			question_id: insertedQuestionId,
			username,
			email,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Something went wrong. Please try again");
	}
}

// ====== Function to get all questions
async function getAllQuestions(req, res) {
	console.log('Getting all questions from db')
	try {
		const [allQuestions] = await dbConnection.query(
			"SELECT * FROM questions ORDER BY questionid DESC"
		);

		return res.status(201).json({
			message: "All questions posted are:",
			questions: allQuestions,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Something went wrong. Please try again");
	}
}

// ============ Function to get details of a specific question
async function getQuestionById(req, res) {
	const { questionId } = req.params;

	try {
		const [questionRows] = await dbConnection.query(
			"SELECT * FROM questions WHERE questionid = ?",
			[questionId]
		);

		if (questionRows.length === 0) {
			return res.status(404).json({ error: "Question not found" });
		}

		const question = questionRows[0];
		res.status(200).json({ question });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
}


module.exports = {
	getQuestionById,
	getAllQuestions,
	postQuestion
};
