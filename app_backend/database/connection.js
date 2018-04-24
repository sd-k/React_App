const pg = require("pg");
const connectionString = "postgresql://localhost/react_library";

const db = new pg.Pool({
	connectionString: connectionString
});

db.connect(err => {
	if (err) console.error(err);
});

exports.db = db;
