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
	},
	getBorrowedBooks: async id => {
		var books;
		try {
			if (id)
				books = await db.query(
					"SELECT book_id,book_name,issue_date FROM borrowed_books where member_id=$1",
					[id]
				);
			books = await db.query("SELECT * FROM borrowed_books");
		} catch (e) {
			console.error(e);
		}
		return books.rows;
	},
	putBorrowRequest: details => {
		try {
			console.log(details);
			// db.query("INSERT INTO borrow_request values($1,$2)", details);
		} catch (e) {
			console.error(e);
		}
	},
	putReturnRequest: details => {
		try {
			console.log(details);
			// db.query('INSERT INTO return_request values($1,$2,$3)',details)
		} catch (e) {
			console.error(e);
		}
	},
	getPendingBorrow: async id => {
		let pendings;
		try {
			if (id)
				pendings = await db.query(
					"SELECT book_id,book_name FROM books JOIN borrow_request using(book_id) where member_id=$1",
					[id]
				);
			else pendings = await db.query("SELECT * FROM borrow_request");
		} catch (e) {
			console.error(e);
		}
		return pendings.rows;
	},
	getPendingReturn: async id => {
		let pendings;
		try {
			if (id)
				pendings = await db.query(
					"SELECT * FROM return_request where member_id=$1",
					[id]
				);
			else pendings = await db.query("SELECT * FROM return_request");
		} catch (e) {
			console.error(e);
		}
		return pendings.rows;
	}
};
