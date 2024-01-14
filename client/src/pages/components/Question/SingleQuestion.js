import React, { useEffect, useState } from "react";
import "./SingleQuestion.css";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../../images/profile.png";
import axios from "../../../axiosConfig";
import Header from "../Header";
import Footer from "../Footer";
function SingleQuestion() {
	let navigate = useNavigate();
	const [question, setQuestion] = useState({});
	const [answer, setAnswer] = useState([]);
	const [userAnswer, setUserAnswer] = useState("");
	const [postResponse, setPostResponse] = useState("");
	const { questionid } = useParams();
	const token = localStorage.getItem("token");

	useEffect(() => {
		try {
			axios
				.get("/questions/single-question/" + questionid, {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					console.log("single", response.data);
					setQuestion(response?.data?.question);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log(error);
		}

		try {
			axios
				.get("/answers/get-answers/" + questionid, {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					console.log("Response", response);
					setAnswer(response?.data?.answers);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	//postanswer for single question
	function questionAnswer(e) {
		e.preventDefault();
		if (userAnswer) {
			setUserAnswer("");
			console.log("token ", token);
			axios
				.post(
					"/answers/save-answer/" + questionid,
					{
						answer: userAnswer,
					},
					{
						headers: {
							authorization: "Bearer " + token,
						},
					}
				)
				.then((response) => {
					setPostResponse(response.data.msg);
					e.target.reset();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPostResponse("answer can't be empty");
		}
	}

	return (
		<>
			<Header />
			<div className="questions">
				<div className="mainQuestionWrapper container">
					<div>
						<h1>Question</h1>
					</div>
					<div>
						<h2>{question?.title}</h2>
					</div>
					<div className="singleQDescritpion">
						<h4>{question?.description}</h4>
					</div>
					<h1 className="community">Answer From The Community</h1>
					{answer?.map((singleAnswer) => {
						let theAnswers = (
							<div className="singleQAnswers">
								<div className="width">
									<img className="questionImage" src={img} alt="" />
									<h2>{singleAnswer.username}</h2>
								</div>
								<div>
									<h2>{singleAnswer?.answer}</h2>
								</div>
							</div>
						);
						return theAnswers;
					})}

					<div className="questionAnswer">
						<h1>Answer The Above Question</h1>

						<h2 className="blue">{postResponse}</h2>

						<form onSubmit={questionAnswer}>
							<textarea
								onChange={(e) => setUserAnswer(e.target.value)}
								name=""
								id=""
								cols="150"
								rows="5"
								placeholder="Your Answer..."
							></textarea>

							<div className="buttonWrapper">
								<button className="questionAnswer-button" type="submit">
									Post Your Answer
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default SingleQuestion;
