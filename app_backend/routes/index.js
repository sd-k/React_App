var express = require("express");
var router = express.Router();
const query = require("../database/query.js");

var getDate = date => {
	var dd = date.getDate();
	var mm = date.getMonth() + 1;
	var yyyy = date.getFullYear();
	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;
	return dd + "/" + mm + "/" + yyyy;
};
/* GET home page. */
router.get("/books", async (req, res, next) => {
	var all_books = await query.getAllBooks();
	var borrowed_books = await query.getBorrowedBooks();
	var books = [all_books, borrowed_books];
	// console.log(books);
	res.status(200).send(books);
});

router.post("/books", (req, res, next) => {
	var new_book = Object.values(req.body);
	query.addBook(new_book);
});
router.delete("/books", (req, res, next) => {
	var book_id = Object.values(req.body);
	console.log(book_id);
	query.deleteOneBook(book_id);
});

router.get("/login", async (req, res, next) => {
	let members = await query.getMemberDetails();

	res.status(200).send(members);
	console.log(members);
});
router.post("/signin", (req, res, next) => {
	let new_member = Object.values(req.body);
	query.createNewMember(new_member);
});
router.get("/members/:id", async (req, res, next) => {
	let member_id = Number(req.params.id);
	console.log(member_id);

	let borrowed_books = await query.getBorrowedBooks(member_id);
	let borrow_request = await query.getPendingBorrow(member_id);
	let return_request = await query.getPendingReturn(member_id);
	let member = [borrowed_books, borrow_request, return_request];
	// console.log(member);
	res.status(200).send(member);
});
router.put("/members", (req, res, next) => {
	let details = Object.values(req.body);
	query.putBorrowRequest(details);
	res.status(200);
});
router.delete("/members/book", (req, res, next) => {
	let details = Object.values(req.body);
	let date = getDate(new Date(Date.now()));
	details.push(date);
	query.putReturnRequest(details);
});

module.exports = router;
