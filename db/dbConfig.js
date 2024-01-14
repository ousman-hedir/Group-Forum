const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
	user: process.env.USER,
	database: process.env.DATABASE,
	// host: "DESKTOP-902K0L5",
	// host: "db4free.net",
		host: process.env.HOST,
  // port:"3308",
	password: process.env.PASSWORD,
	// connectionLimit: 10,
});

// dbConnection.execute("select 'test' ", (err, result) => {
// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		console.log(result);
// 	}
// });
module.exports=dbConnection.promise()