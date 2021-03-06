import React, { Component } from "react";
import tag from "./tag";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.signUpButtonClicked = this.signUpButtonClicked.bind(this);
		this.ifError = this.ifError.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	ifError(first_name, last_name, mobile_no, password, confirm_password) {
		if (
			first_name.length === 0 ||
			last_name.length === 0 ||
			mobile_no.length === 0 ||
			password.length === 0 ||
			confirm_password.length === 0
		) {
			alert("ERROR : No field can left blank");
			return true;
		}
		if (!first_name.match(/^[a-zA-Z]{3,}$/)) {
			alert("ERROR : First name");
			return true;
		}
		if (!last_name.match(/^[a-zA-Z]{3,}$/)) {
			alert("ERROR : Second name");
			return true;
		}
		if (
			!mobile_no.match(
				/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
			)
		) {
			alert("ERROR : Invalid Mobile number");
			return true;
		}
		if (!password.match(/^[a-zA-Z0-9]{6,10}$/)) {
			alert("Choose a valid password");
			return true;
		}
		if (confirm_password !== password) {
			alert("ERROR : Password do not match");
			return true;
		}
	}

	signUp = async (name, mobile_no, confirm_password) => {
		let response = await fetch("/signin", {
			method: "POST",
			body: JSON.stringify({
				name,
				mobile_no,
				confirm_password
			}),
			headers: { "Content-Type": "application/json" }
		});
		let body = await response.json();
		if (response.status !== 200) throw Error(body.message);
	};

	signUpButtonClicked() {
		let first_name = this.refs.first_name.value,
			last_name = this.refs.last_name.value,
			mobile_no = this.refs.mobile_no.value,
			password = this.refs.password.value,
			confirm_password = this.refs.confirm_password.value;
		let error = this.ifError(
			first_name,
			last_name,
			mobile_no,
			password,
			confirm_password
		);
		if (error) return;
		this.signUp(
			first_name.concat(" ", last_name),
			mobile_no,
			password,
			confirm_password
		);
	}

	render() {
		return (
			<div align="center">
				<div id="signup">
					<tag.Lable value="Enter details to sign in :" />
					<br />
					<input
						type="text"
						ref="first_name"
						placeholder="First name"
						size="30"
					/>
					<br />
					<input
						type="text"
						ref="last_name"
						placeholder="Second name"
						size="30"
					/>
					<br />
					<input
						type="text"
						ref="mobile_no"
						placeholder="Mobile Number"
						size="30"
					/>
					<br />
					<input
						type="password"
						ref="password"
						placeholder="Password"
						size="30"
					/>
					<br />
					<input
						type="password"
						ref="confirm_password"
						placeholder="Confirm Password"
						size="30"
					/>
					<br />
					<tag.Button
						onClick={this.signUpButtonClicked}
						value="Sign up"
					/>
				</div>
				<div>
					<br />
					<br />
					<tag.Lable value="Already a member ? Login here " />
					<tag.Button
						onClick={this.props.handleOnClick}
						value="Log in"
					/>
				</div>
			</div>
		);
	}
}

export default SignUp;
