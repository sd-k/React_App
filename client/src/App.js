import React, { Component } from "react";
import UserLogin from "./login";
import UserSignIn from "./signin";

class App extends Component {
	constructor(props) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.state = {
			signInButtonClicked: false,
			logInButtonClicked: true
		};
	}
	handleOnClick(option) {
		if (option === "sign_in") {
			this.setState(prevState => ({
				signInButtonClicked: !prevState.signInButtonClicked,
				logInButtonClicked: !prevState.logInButtonClicked
			}));
		}
		if (option === "log_in") {
			this.setState(prevState => ({
				signInButtonClicked: !prevState.signInButtonClicked,
				logInButtonClicked: !prevState.logInButtonClicked
			}));
		}
	}

	render() {
		if (this.state.logInButtonClicked)
			return (
				<div align="center">
					<UserLogin />
					<p>Click to sign in :</p>
					<button onClick={() => this.handleOnClick("sign_in")}>
						Sign in
					</button>
				</div>
			);
		return (
			<div align="center">
				<UserSignIn />
				<p>Click to log in :</p>
				<button onClick={() => this.handleOnClick("log_in")}>
					Log in
				</button>
			</div>
		);
	}
}

export default App;
