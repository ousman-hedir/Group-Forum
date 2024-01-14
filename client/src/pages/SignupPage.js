import React, { useEffect, useState, useContext } from "react";
import { stateValue } from "./components/Context";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosBase from "../axiosConfig";
import About from "./components/About";

function SignupPage({ registerAndLoginToogler }) {
	const [registerResponse, setRegisterResponse] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	let { username, setusername } = useContext(stateValue);

	let [firstToogle, setFirstToggle] = useState(true);

	useEffect(() => {
		setusername("");
		localStorage.setItem("token", "");
	}, []);

	const agreeAndJoinHandler = async (event) => {
		event.preventDefault();
		let data = {
			email: email,
			firstname: firstName,
			lastname: lastName,
			username: userName,
			password: password,
		};
		const res = {};
		try {
			const response = await axiosBase.post("/users/register", data);
			res.message = response;
			navigate("/login");
		} catch (error) {
			setRegisterResponse(
				"Error registering into the system. Please try again."
			);
			console.log(error.response);
		}
	};

	return (
		<section className="body-content">
			<div className="container px-md-5">
				<div className="row">
					<div className="col-12 col-md-5 shadow mx-md-4 login-section">
							<form onSubmit={agreeAndJoinHandler}>
								<div className="mainRegisterWrapper">
									<div className="secondRegisterWrapper">
										<div className="joinNetwork">
											<h3 className="textCenter">Join the network</h3>
											<p className="textCenter">
												Already have an account?
												<span
													className="orange"
													onClick={registerAndLoginToogler}
												>
													Sign in
												</span>
											</p>
										</div>

										<h3 className="red">{registerResponse}</h3>

										<div className="extended-input">
											<input
												className="input-extend"
												type="email"
												placeholder="Email"
												name="email"
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
										<div className="extended-input">
											<input
												type="text"
												className="half-input first-name"
												placeholder="First Name"
												onChange={(e) => setFirstName(e.target.value)}
											/>
											<input
												type="text"
												className="half-input"
												placeholder="Last Name"
												onChange={(e) => setLastName(e.target.value)}
											/>
										</div>
										<div className="extended-input">
											<input
												className="input-extend"
												type="text"
												placeholder="User Name"
												onChange={(e) => setUserName(e.target.value)}
											/>
										</div>
										<div className="extended-input">
											<input
												className="input-extend"
												type="password"
												placeholder="Password"
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div className="textCenter">
											<button
												className="agree-and-join"
												onClick={agreeAndJoinHandler}
											>
												Agree and Join
											</button>
										</div>

										<p className="textCenter">
											I agree to the{" "}
											<Link className="orange">privacy policy</Link> and{" "}
											<Link className="orange">terms of service.</Link>
										</p>
										<p className="textCenter">
											<p
												className="orange already"
												onClick={registerAndLoginToogler}
											>
												Already have an account?
											</p>
										</p>
									</div>
								</div>
							</form>
					</div>
					<About />
				</div>
			</div>
		</section>
	);
}
export default SignupPage;
