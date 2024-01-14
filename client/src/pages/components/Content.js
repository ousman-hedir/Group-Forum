import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "../LandingPage";
import SignupPage from "../SignupPage";

const Content = () => {
	const [firstToogle, setFirstToggle] = useState(true);

	const toggleLnadingPage = () => {
		setFirstToggle(!firstToogle);
	};

	return !firstToogle ? (
		<SignupPage registerAndLoginToogler={toggleLnadingPage} />
	) : (
		<LandingPage registerAndLoginToogler={toggleLnadingPage} />
	);
};

export default Content;
