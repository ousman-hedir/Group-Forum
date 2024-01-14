import { useContext } from "react";
import { stateValue } from "./components/Context";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AllQuestions from "./components/Question/AllQuestions";
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/free-regular-svg-icons'
import '@fortawesome/free-brands-svg-icons'
import '../css/styles.css'

function Home() {
	const { username } = useContext(stateValue);

	return (
		<div className="root">
			<Header />
			{!username.username ? <Content /> : <AllQuestions />}
			<Footer />
		</div>
	);
}
export default Home;
