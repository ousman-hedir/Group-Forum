require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = 3309;
const app = express();
const cors = require("cors");
app.use(cors());

//db connection
const dbConnection = require("./db/dbConfig");

//user routes middleware 
const userRoutes = require("./routes/userRoute");
//question routes middleware 
const questionsRoutes = require("./routes/questionRoute");
// awnswers route middleware
const answersRoutes = require('./routes/answersRoute')
//authentication midleware 
const authMiddleware = require("./middleware/authMiddleware");

//json mddleware to extract json data
app.use(express.json());
//user routes middleware
app.use("/api/users", userRoutes);

//question route midleware??

app.use("/api/questions", authMiddleware, questionsRoutes);
app.use('/api/answers', authMiddleware, answersRoutes)
//answers routes midleware??

async function start() {
	try {
		const result = await dbConnection.execute("select 'test' ");
		await app.listen(port);
		console.log("database connection established");
		console.log(`listening on ${port}`);
	} catch (error) {
		console.log(error.message);
	}
}
start();
