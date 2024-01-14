import axios from "axios";

const axiosBase = axios.create({
	baseURL: "http://localhost:3309/api",
});
export default axiosBase;
