import React, { Component } from "react";
import Login from "./login";
import SignUp from "./signup";
import MemberHome from "./member.js";
import AdminHome from "./admin.js";

class App extends Component {
	constructor(props) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.state = {
			member_name: null,
			member_id: null,
			signUpButtonClicked: false,
			loginButtonClicked: true
		};
	}
	handleOnClick(member) {
		if (member.member_id && member.member_name) {
			this.setState({
				member_id: member.member_id,
				member_name: member.member_name
			});
			return;
		}

		this.setState(prevState => ({
			signUpButtonClicked: !prevState.signUpButtonClicked,
			loginButtonClicked: !prevState.loginButtonClicked
		}));
	}

	render() {
		let member_id = this.state.member_id,
			member_name = this.state.member_name;

		if (member_id !== null && member_name !== null) {
			if (member_id === 1 && member_name === "Sougata Das")
				return <AdminHome />;
			return (
				<MemberHome member_id={member_id} member_name={member_name} />
			);
		}

		if (this.state.loginButtonClicked) {
			return <Login handleOnClick={this.handleOnClick} />;
		}

		return <SignUp handleOnClick={this.handleOnClick} />;
	}
}

export default App;
