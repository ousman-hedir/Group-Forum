import React, { useEffect, useState, useContext } from "react";
import "./AllQuestions.css";
import { stateValue } from "../Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../images/profile.png";
import { MdArrowForwardIos } from "react-icons/md";
import axiosBase from "../../../axiosConfig";
import Footer from "../Footer";
import Header from "../Header";

function AllQuestions() {
	let { username, setusername } = useContext(stateValue);
	let navigate = useNavigate();

	//get token from local storage
	const token = localStorage.getItem("token");

	//state to store the questions from the server
	let [question, setQuestion] = useState([]);

	useEffect(() => {
		try {
			axiosBase
				.get("/questions/all-questions", {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setQuestion(response?.data.questions);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	function navigateToQuestionDetail(singleQ) {
		navigate = navigate("/single-question/" + singleQ?.questionid);
	}

	function search(e) {
		try {
			axios
				.get("/questions/all-questions", {
					headers: {
						authorization: "Bearer " + token,
						search: e.target.value,
					},
				})
				.then((response) => {
					if (response.data.searchQuestions)
						setQuestion(response.data.searchQuestions);
					else setQuestion(response.data.questions);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Header />
			<div className="questions">
				<div className="main container">
					<div className="flexWrapper upperwelcome row justify-content-between">
						<button
							className="Abutton col-12 col-sm-3"
							onClick={() =>
								navigate("/askQuestion", {
									state: { questionId: question.length },
								})
							}
						>
							Ask Question
						</button>
						<input
							type="text"
							placeholder="Search Questions"
							className="Ainput col-12 col-sm-3"
							onChange={search}
						/>

						<h4 className="col-12 col-sm-3">Welcome: {username.username}</h4>
					</div>

					<div className="allQuestions">
						<h2>Questions</h2>
						{question?.map((singleQuestion, index) => {
							return (
								<div
									className="questions"
									onClick={() => navigateToQuestionDetail(singleQuestion)}
									key={index}
								>
									<div className="width">
										<img className="questionImage" src={img} alt="" />
										<p>{singleQuestion?.username}</p>
									</div>

									<h4>{singleQuestion?.title}</h4>
									<MdArrowForwardIos className="ArrowIcon" />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AllQuestions;
