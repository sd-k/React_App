import React, { Component } from "react";
class ListOfBooks extends Component {
	constructor(props) {
		super(props);
		this.deleteBooks = this.deleteBooks.bind(this);
	}

	deleteBooks = async book_id => {
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
		if (this.props.books.length === 0) {
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
							{this.props.purpose === "toShow"
								? this.props.books.map(book => {
										return (
											<tr key={book.book_id}>
												<td>{book.book_name}</td>
											</tr>
										);
									})
								: this.props.books.map(book => {
										return (
											<tr key={book.book_id}>
												<td>{book.book_name}</td>
												<td>
													<button
														onClick={() =>
															this.deleteBooks(
																book.book_id
															)
														}
													>
														Delete
													</button>
												</td>
											</tr>
										);
									})}
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
			books: []
		};
	}

	componentDidMount = async () => {
		var response = await fetch("/books");
		var books = await response.json();
		this.setState({ books: books });
		console.log(books);
	};

	render() {
		return (
			<div>
				<ListOfBooks
					books={this.state.books}
					purpose={this.props.purpose}
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
				<ShowAllBooks purpose="toDelete" />
			</div>
		);
	}
}

export { ListOfBooks, ShowAllBooks, AddBooks, DeleteBook };
