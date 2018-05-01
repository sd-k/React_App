import React from "react";
import tag from "./tag";
import { ShowAllBooks } from "./books.js";

class BorrowNewBooks extends React.Component {
	render() {
		return (
			<div>
				<ShowAllBooks
					purpose="to_borrow"
					member_id={this.props.member_id}
					request_left={this.props.request_left}
					requestedBooks={this.props.requestedBooks}
					requested_books={this.props.requested_books}
				/>
			</div>
		);
	}
}
class ReturnBooks extends React.Component {
	render() {
		return (
			<div>
				<BorrowedBooks
					purpose="to_return"
					borrowed_books={this.props.borrowed_books}
					member_id={this.props.member_id}
				/>
			</div>
		);
	}
}

class BorrowedBooks extends React.Component {
	constructor(props) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick = async book_id => {
		var member_id = this.props.member_id;

		var response = await fetch("/members/book", {
			method: "DELETE",
			body: JSON.stringify({ member_id, book_id }),
			headers: { "Content-Type": "application/json" }
		});
		var body = await response.json();
		if (response.status !== 200) throw Error(body.message);
	};

	render() {
		let to_show = this.props.purpose === "to_show" ? true : false;
		let borrowed_books = this.props.borrowed_books;
		return (
			<div>
				{to_show ? (
					<tag.Para text="Your borrowed books details -" />
				) : (
					<tag.Para text="Select books to return" />
				)}
				<table cellPadding="5">
					<thead>
						{to_show ? (
							<tr key="header">
								<th>Sl.no.</th>
								<th>Books</th>
								<th>Issued on</th>
							</tr>
						) : null}
					</thead>
					<tbody>
						{borrowed_books.map((book, i) => {
							return (
								<tr key={book.book_id}>
									<td align="center">{i + 1 + "."}</td>
									<td>{book.book_name}</td>
									<td align="center">
										{to_show ? (
											book.issue_date
										) : (
											<tag.Button
												value="Return"
												onClick={() =>
													this.handleOnClick(
														book.book_id
													)
												}
											/>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

class MemberHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			borrowed_books: [],
			requested_books: [],
			return_request: [],
			request_left: 0,
			home_button_clicked: true,
			borrow_button_clicked: false,
			return_button_clicked: false
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.requestedBooks = this.requestedBooks.bind(this);
	}

	requestedBooks(request_left, requested_books, book_id) {
		this.setState({
			request_left: request_left,
			requested_books: this.state.requested_books
		});
	}

	handleOnClick(purpose) {
		if (purpose === "call_return") {
			this.setState({
				home_button_clicked: false,
				borrow_button_clicked: false,
				return_button_clicked: true
			});
			return;
		}
		if (purpose === "call_borrow") {
			this.setState({
				home_button_clicked: false,
				borrow_button_clicked: true,
				return_button_clicked: false
			});
			return;
		}
		this.setState({
			home_button_clicked: true,
			borrow_button_clicked: false,
			return_button_clicked: false
		});
		return;
	}

	componentDidMount = async () => {
		let member_id = this.props.member_id;
		let response = await fetch(`/members/${member_id}`);
		let body = await response.json();
		if (response.status !== 200) throw Error(body.message);

		this.setState({
			borrowed_books: body[0],
			requested_books: body[1],
			return_request: body[2],
			request_left: 3 - (body[0].length + body[1].length)
		});
	};

	render() {
		if (this.state.return_button_clicked) {
			return (
				<div align="center">
					<ReturnBooks
						member_id={this.props.member_id}
						borrowed_books={this.state.borrowed_books}
						return_request={this.state.return_request}
					/>
					<tag.Button
						value="Back"
						onClick={() => {
							this.handleOnClick("call_home");
						}}
					/>
				</div>
			);
		}

		if (this.state.borrow_button_clicked) {
			let request_left = this.state.request_left;
			// let
			// alert("You can borrow " + request_left + " books ");
			return (
				<div align="center">
					<BorrowNewBooks
						request_left={request_left}
						member_id={this.props.member_id}
						requestedBooks={this.requestedBooks}
						requested_books={this.state.requested_books}
					/>
					<br />
					<br />
					<tag.Button
						value="Back"
						onClick={() => {
							this.handleOnClick("call_home");
						}}
					/>
				</div>
			);
		}

		if (this.state.home_button_clicked) {
			let requested_books = this.state.requested_books;
			return (
				<div align="center">
					<div>
						<BorrowedBooks
							borrowed_books={this.state.borrowed_books}
							purpose="to_show"
						/>
						<br />
						<br />
						<tag.Button
							value="Return books"
							onClick={() => this.handleOnClick("call_return")}
						/>
						{this.state.request_left > 0 ? (
							<tag.Button
								value="Borrow books"
								onClick={() =>
									this.handleOnClick("call_borrow")
								}
							/>
						) : null}
					</div>

					{requested_books.length !== 0 ? (
						<div>
							<hr />
							<tag.Lable value="Requested Books :" />
							<table>
								<tbody>
									{requested_books.map((book, i) => {
										return (
											<tr key={i}>
												<td>{book}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					) : null}
				</div>
			);
		}
	}
}
export default MemberHome;
