import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LandingPage";
import Register from "./pages/SignupPage";
import AskQuestion from "./pages/components/Question/AskQuestion";

import { useEffect, useState, createContext } from "react";
import axiosBase from "./axiosConfig";
import { useNavigate } from "react-router-dom";

import { stateValue } from "./pages/components/Context";
import SingleQuestion from "./pages/components/Question/SingleQuestion";
import AllQuestions from "./pages/components/Question/AllQuestions";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";

function App() {
	const [username, setusername] = useState({ username: "" });
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	async function checkUser() {
		try {
			const { data } = await axiosBase.get("/users/check", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setusername({ username: data.username });
		} catch (error) {
			console.log(error.response);
			navigate("/");
		}
	}
	useEffect(() => {
		checkUser();
	}, []);
	return (
		<stateValue.Provider value={{ username, setusername }}>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/all-questions" element={<AllQuestions />}></Route>
				<Route path="/askQuestion" element={<AskQuestion />}></Route>
				<Route path="/single-question/:questionid" element={<SingleQuestion />}></Route>
			</Routes>
		</stateValue.Provider>
	);
}

export default App;
