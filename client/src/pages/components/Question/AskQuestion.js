import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./AskQuestion.css";
import axiosBase from "../../../axiosConfig";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
function AskQuestion() {
	const locationState = useLocation();
	const [numberOfQuestions, setNumberOfQuestions] = useState(
		locationState.state.questionId
	);
	const [titleValue, setTitleValue] = useState("");
	const [discriptionValue, setDiscriptionValue] = useState("");
	const [questionResponse, setQuestionResponse] = useState("");

	function submit(e) {
		e.preventDefault();
		if (!titleValue || !discriptionValue) {
			return setQuestionResponse(
				"Question title or Discrtiption can not be empty"
			);
		}
		const token = localStorage.getItem("token");

		try {
			axiosBase
				.post(
					"/questions/save-question",
					{
						title: titleValue,
						description: discriptionValue,
						questionId: numberOfQuestions + 1,
					},
					{
						headers: {
							authorization: "Bearer " + token,
						},
					}
				)
				.then((response) => {
					setQuestionResponse(response.data.msg);
					setNumberOfQuestions(numberOfQuestions + 1);
					e.target.reset();
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Header />
			<div className="questions">
				<Container className="my-5">
					<div className="d-flex flex-column align-items-center my-5">
						<h3 className="text-center my-4 underline">
							{" "}
							Steps to write a good question
						</h3>

						<ul
							style={{
								width: "50%",
								margin: "0 auto",
								marginBottom: "60px",
								lineHeight: "30px",
							}}
						>
							<li>Summerize your problem in a one-line title.</li>
							<li>Describe your problem in more detail.</li>
							<li>Describe what you tried and what you expected to happen.</li>
							<li>Review your question and post it to the site.</li>
						</ul>
					</div>

					<div className="text-center my-2 underline textt">
						<h3>Ask a public question</h3>
						<Link
							to="/allquestion"
							className="text-decoration-none text-reset cursor-pointer"
						>
							<p>Go to Question page</p>
						</Link>

						<br />
						<h1 className="blue">{questionResponse}</h1>
					</div>

					<form onSubmit={submit} className="shadow-sm py-3 px-5">
						<div className="askQuestion">
							<input
								className="question_title"
								onChange={(e) => setTitleValue(e.target.value)}
								type="text"
								placeholder="Title"
							/>
							<br />

							<textarea
								className="question_title"
								onChange={(e) => setDiscriptionValue(e.target.value)}
								name=""
								id=""
								cols=""
								rows=""
								placeholder="Question description..."
							></textarea>
							<br />
							<button className="question_post_btn" type="submit">
								Post Your Question
							</button>
						</div>
					</form>
				</Container>
			</div>
			<Footer />
		</>
	);
}

export default AskQuestion;
