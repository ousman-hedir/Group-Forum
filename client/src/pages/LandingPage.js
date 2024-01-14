import React, { useEffect, useState, useContext } from "react";
import { stateValue } from "./components/Context";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosBase from "../axiosConfig";
import About from "./components/About";

function LandingPage({ registerAndLoginToogler }) {
	let [loginResponse, setLoginResponse] = useState("");
	let [loginEmail, setLoginEmail] = useState("");
	let [loginPassword, setLoginPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	let { username, setusername } = useContext(stateValue);

	useEffect(() => {
		setusername("");
		localStorage.setItem("token", "");
	}, []);

	const loginHandler = async (event) => {
		event.preventDefault();

		const loginData = {
			email: loginEmail,
			password: loginPassword,
		};
		try {
			const { data } = await axiosBase.post("/users/login", loginData);
			localStorage.setItem("token", data.token);
			navigate("/all-questions");
			console.log(data);
		} catch (error) {
			alert(error?.response?.data?.msg);
			console.log(error.response.data);
		}
	};

	return (
		<section className="body-content">
			<div className="container px-md-5">
				<div className="row">
					<div className="col-12 col-md-5 shadow mx-md-4 login-section">
						<div className="login-header">
							<h5>Login to your account</h5>
						</div>
						<div className="login-info">
							Don't have an account?
							<span
								type="button"
								onClick={registerAndLoginToogler}
								className="new-account"
							>
								<span>Create a new account</span>
							</span>
						</div>
						<div className="login-form">
							<form>
								<div className="form-group ">
									<input
										type="email"
										className="form-control form-input"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Email Address"
										onChange={(e) => setLoginEmail(e.target.value)}
									/>
								</div>
								<div className="form-group password-input-container">
									<input
										type={showPassword ? "text" : "password"}
										className="form-control form-input"
										id="exampleInputPassword1"
										placeholder="Password"
										onChange={(e) => setLoginPassword(e.target.value)}
									/>
									<span
										onClick={() => setShowPassword(!showPassword)}
										className="eye-button"
									>
										<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
									</span>
								</div>
								<div className="reset-password">
									<a href="/">Forgot password?</a>
								</div>
								<button
									type="submit"
									className="login-button"
									onClick={loginHandler}
								>
									Login
								</button>
								<h3 className="red">{loginResponse}</h3>
							</form>
						</div>
					</div>
					<About />
				</div>
			</div>
		</section>
	);
}
export default LandingPage;
