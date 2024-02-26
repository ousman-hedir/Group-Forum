import axios from "axios";

const axiosBase = axios.create({
	// baseURL: "http://localhost:3309/api",
	baseURL: "https://group-forum.onrender.com/api",
});
export default axiosBase;
