import React, { useContext, useState } from "react";
import logo from "../../images/evangadi-logo.png";
import { useNavigate } from "react-router-dom";
import { stateValue } from "./Context";
import { Link } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const { username } = useContext(stateValue);
	const [signedIn, setSignedIn] = useState(username.username !== "");

	const signOutFunc = () => {
		localStorage.setItem("token", "");
		setSignedIn(false);
		navigate("/");
	};

	const renderHomePage =()=> {
		navigate('/')
	}

	return (
		<header className="header-top navbar navbar-expand-lg fixed-top shadow-sm">
			<div className="container">
				<div className="px-md-4 logo-container">
					<Link to="/" onClick={renderHomePage}>
						<img src={logo} alt="This is Evangadi website logo"></img>
					</Link>
				</div>
				<div className="offcanvas">
					<div className="offcanvas-body links">
						<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li className="nav-item">
								<Link className="nav-link" to="/" onClick={renderHomePage}>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/">
									How it works
								</Link>
							</li>
							<li className="nav-item">
								<button
									type="button"
									className="btn btn-warning nav-link sign-in"
									onClick={signOutFunc}
								>
									{signedIn ? "SIGN OUT" : "SIGN IN"}
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
