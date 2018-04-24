import React, { Component } from "react";
import { ShowAllBooks, AddBooks, DeleteBook } from "./books";
// import logo from "./logo.svg";
// import "./App.css";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			add_button_clicked: false,
			delete_button_clicked: false
		};
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick(button) {
		console.log(button);
		if (button === "add_button") {
			this.setState(prevState => ({
				add_button_clicked: !prevState.add_button_clicked
			}));
			if (this.state.delete_button_clicked)
				this.setState({ delete_button_clicked: false });
		}
		if (button === "delete_button") {
			this.setState(prevState => ({
				delete_button_clicked: !prevState.delete_button_clicked
			}));
			if (this.state.add_button_clicked)
				this.setState({ add_button_clicked: false });
		}
		if (button === "show_book") {
			this.setState({ delete_button_clicked: false });
		}
	}

	render() {
		let add_button = this.state.add_button_clicked,
			delete_button = this.state.delete_button_clicked;

		if (delete_button) {
			return (
				<div align="center">
					<DeleteBook />
					<button onClick={() => this.handleOnClick("show_book")}>
						Show Books
					</button>
				</div>
			);
		}

		return (
			<div align="center">
				<ShowAllBooks purpose="toShow" />
				<button onClick={() => this.handleOnClick("add_button")}>
					Add Book
				</button>

				<button onClick={() => this.handleOnClick("delete_button")}>
					Delete Book
				</button>

				{add_button ? <AddBooks /> : null}
				{delete_button ? <DeleteBook /> : null}
			</div>
		);
	}
}

export default Admin;
