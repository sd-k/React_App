import React, { Component } from "react";
import tag from "./tag.js";

class Login extends Component {
	constructor(props) {
		super(props);
		this.memberLogIn = this.memberLogIn.bind(this);
	}

	memberLogIn = async () => {
		var handleOnClick = this.props.handleOnClick;
		var mobile_no = this.refs.mobile_no.value;
		var password = this.refs.password.value;

		if (mobile_no.length !== 10 && password.length < 6) {
			alert("ERROR : Invalid input");
			return;
		}

		const res = await fetch("/login");
		const body = await res.json();
		if (res.status !== 200) throw Error(body.message);

		var member = body.filter(member => {
			return (
				Number(mobile_no) === member.mobile_no &&
				password === member.password
			);
		});

		if (member.length === 0) {
			alert("ERROR : Invalid details");
			return;
		}

		handleOnClick(member[0]);
	};

	render() {
		return (
			<div align="center">
				<div id="login">
					<tag.Lable value="Login here :" />
					<br />
					<input
						type="text"
						placeholder="Enter mobile number"
						ref="mobile_no"
						size="30"
					/>
					<br />
					<input
						type="password"
						placeholder="Enter password"
						ref="password"
						size="30"
					/>
					<br />
					<tag.Button onClick={this.memberLogIn} value="Log in" />
				</div>
				<div>
					<br />
					<br />
					<tag.Lable value="New member ? Sign up here " />
					<tag.Button
						onClick={this.props.handleOnClick}
						value="Sign up"
					/>
				</div>
			</div>
		);
	}
}

export default Login;
