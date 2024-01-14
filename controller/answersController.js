const dbConnection = require("../db/dbConfig");

// post answer
async function postAnswer(req, res) {
	console.log("Request Data>> ", req.params);
	const { answer } = req.body;
	const { questionId } = req.params;

	if (!answer) {
		return res.status(400).send("Please provide the answer content");
	}

	try {
		// check if the client posts an identical answer
		const [existingAnswer] = await dbConnection.query(
			"SELECT questionid, userid FROM answers WHERE answer = ?",
			[answer]
		);

		if (existingAnswer.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send("Your answer is identical to a previous one.");
		}

		// Get user information from the JWT token
		const user_id_from_token = req.user.userid;
		const username = req.user.username;

		const [insertResult] = await dbConnection.query(
			"INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
			[user_id_from_token, questionId, answer]
		);
		const insertedAnswerId = insertResult.insertId;

		const email = req.user.email;

		return res.status(201).json({
			message: "Answer posted successfully",
			answerid: insertedAnswerId,
			questionId,
			email,
			username,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Something went wrong. Please try again");
	}
}

// get answer
async function getAnswerByQuestionId(req, res) {
	const { questionId } = req.params;

	try {
		const [answers] = await dbConnection.query(
			"SELECT * FROM answers WHERE questionid = ?",
			[questionId]
		);

		// if (answers.length === 0) {
		// 	return res.status(404).json({
		// 		message: "No answers found for the specified question",
		// 	});
		// }

		return res.status(200).json({
			message: "Answers found for the specified question",
			answers,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Something went wrong. Please try again");
	}
}

module.exports = { postAnswer, getAnswerByQuestionId };
