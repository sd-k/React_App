var express = require("express");
var router = express.Router();
const query = require("../database/query.js");

/* GET home page. */
router.get("/books", async (req, res, next) => {
	var books = await query.getAllBooks();
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

module.exports = router;
