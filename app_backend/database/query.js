const db = require("./connection.js").db;

module.exports = {
	addBook: book_name => {
		try {
			db.query("insert into books (book_name) values($1)", book_name);
			console.log("One book inserted");
		} catch (e) {
			console.log(err);
		}
	},
	getAllBooks: async () => {
		try {
			var books = await db.query("select * from books");
		} catch (e) {
			console.error(e);
		}
		return books.rows;
	},
	deleteOneBook: async book_id => {
		try {
			db.query("DELETE FROM books WHERE book_id=$1", book_id);
		} catch (e) {
			console.error(e);
		}
	},
	getMemberDetails: async () => {
		try {
			var details = await db.query("SELECT * FROM members");
		} catch (e) {
			console.error(e);
		}
		return details.rows;
	},
	createNewMember: new_member => {
		try {
			console.log(new_member);
			// db.query(
			// 	"INSERT INTO members(member_name,mobile_no,password) VALUES($1,$2,$3)",
			// 	new_member
			// );
		} catch (e) {
			console.error(e);
		}
	}
};
