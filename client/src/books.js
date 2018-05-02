import React, { Component } from "react";
import tag from "./tag.js";
class ListOfBooks extends Component {
	constructor(props) {
		super(props);
		this.deleteBooks = this.deleteBooks.bind(this);
		this.borrowNewBook = this.borrowNewBook.bind(this);
		this.state = {
			request_left: this.props.request_left,
			requested_books: this.props.requested_books
		};
	}

	borrowNewBook = async (book_id, book_name) => {
		var member_id = this.props.member_id;
		var requested_books = this.state.requested_books;
		var requestedBooks = this.props.requestedBooks;
		var request_left = this.state.request_left;
		if (request_left === 0) {
			alert("ERROR : No request left ");
			return;
		}
		var new_book = { book_id: book_id, book_name: book_name };
		requested_books.push(new_book);

		this.setState({
			request_left: request_left - 1,
			requested_books: requested_books
		});
		requestedBooks(request_left - 1, requested_books);

		let response = await fetch("/members", {
			method: "PUT",
			body: JSON.stringify({ member_id, book_id }),
			headers: { "Content-Type": "application/json" }
		});
		let body = await response.json();
		if (response.status !== 200) throw Error(body.message);
	};

	deleteBooks = async book_id => {
		let borrowed_books = this.props.borrowed_books;
		if (
			borrowed_books.filter(book => {
				return book_id === book.book_id;
			}).length !== 0
		) {
			alert("Error : Book is Borrowed");
			return;
		}

		let option = window.confirm("Confirm Deletion ?");
		if (!option) return;
		var response = await fetch("/books", {
			method: "DELETE",
			body: JSON.stringify({ book_id: book_id }),
			headers: { "Content-Type": "application/json" }
		});
		var body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		console.log(book_id);
	};

	render() {
		let purpose = this.props.purpose;
		let all_books = this.props.all_books;
		let borrowed_books = this.props.borrowed_books;
		let requested_books = this.state.requested_books;

		if (all_books.length === 0) {
			return (
				<div>
					<h3>No available book</h3>
				</div>
			);
		}
		return (
			<div>
				<font size="2">
					<table>
						<thead>
							<tr key="header">
								<th>
									<b>Available Books</b>
								</th>
							</tr>
						</thead>
						<tbody>
							{purpose === "to_show"
								? all_books.map(book => {
										return (
											<tr key={book.book_id}>
												<td>{book.book_name}</td>
											</tr>
										);
									})
								: purpose === "to_delete"
									? all_books.map(book => {
											return (
												<tr key={book.book_id}>
													<td>{book.book_name}</td>
													<td>
														<tag.Button
															onClick={() =>
																this.deleteBooks(
																	book.book_id
																)
															}
															value="Delete"
														/>
													</td>
												</tr>
											);
										})
									: purpose === "to_borrow"
										? all_books.map(book => {
												return (
													<tr key={book.book_id}>
														<td>
															{book.book_name}
														</td>
														<td>
															{borrowed_books.filter(
																borrwed_book => {
																	return (
																		book.book_id ===
																		borrwed_book.book_id
																	);
																}
															).length !== 0 ? (
																<tag.Lable value="not available" />
															) : requested_books.filter(
																sent => {
																	return (
																		sent.book_id ===
																		book.book_id
																	);
																}
															).length !== 0 ? (
																<tag.Lable value="Request sent" />
															) : (
																<tag.Button
																	id={
																		book.book_id
																	}
																	onClick={() =>
																		this.borrowNewBook(
																			book.book_id,
																			book.book_name
																		)
																	}
																	value="Borrow"
																/>
															)}
														</td>
													</tr>
												);
											})
										: null}
						</tbody>
					</table>
				</font>
			</div>
		);
	}
}

class ShowAllBooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			all_books: [],
			borrowed_books: []
		};
	}

	componentDidMount = async () => {
		var response = await fetch("/books");
		var body = await response.json();

		this.setState({ all_books: body[0], borrowed_books: body[1] });
	};

	render() {
		return (
			<div>
				<ListOfBooks
					all_books={this.state.all_books}
					borrowed_books={this.state.borrowed_books}
					purpose={this.props.purpose}
					member_id={this.props.member_id}
					request_left={this.props.request_left}
					requestedBooks={this.props.requestedBooks}
					requested_books={this.props.requested_books}
				/>
			</div>
		);
	}
}

class AddBooks extends Component {
	constructor(props) {
		super(props);
		this.handleOnclick = this.handleOnclick.bind(this);
	}

	handleOnclick = async event => {
		event.preventDefault();
		console.log("in method onClick");
		let book_name = this.refs.book_name.value;
		let author_name = this.refs.author_name.value;

		if (book_name.length === 0 || author_name.length === 0) {
			alert("ERROR !! Enter valid details.");
			return;
		}

		var new_book = book_name.concat(", ", author_name);
		console.log("new_book :", new_book);

		var response = await fetch("/books", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ book: new_book })
		});
		var body = await response.json();
		if (response.status !== 200) throw Error(body.message);
	};

	render() {
		return (
			<div>
				<input type="text" ref="book_name" placeholder="Book name" />
				<input
					type="text"
					ref="author_name"
					placeholder="Author name"
				/>
				<button onClick={this.handleOnclick}>Add book</button>
			</div>
		);
	}
}

class DeleteBook extends Component {
	render() {
		return (
			<div>
				<ShowAllBooks purpose="to_delete" />
			</div>
		);
	}
}

export { ListOfBooks, ShowAllBooks, AddBooks, DeleteBook };
