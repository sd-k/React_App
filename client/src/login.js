import React, { Component } from "react";
import Home from "./home.js";

class UserLogin extends Component {
	constructor(props) {
		super(props);
		this.memberLogIn = this.memberLogIn.bind(this);
		this.ifError = this.ifError.bind(this);
		this.state = {
			member_id: null,
			member_name: null
		};
	}

	ifError(mobile_no, password, body) {
		if (mobile_no.length !== 10) {
			alert("ERROR : Mobile number");
			return true;
		}
		if (password.length < 6) {
			alert("ERROR : Password");
			return true;
		}
		if (
			body.filter(member => {
				return Number(mobile_no) === member.mobile_no;
			}).length === 0
		) {
			alert("ERROR : Member not present");
			return true;
		}

		var member = body.filter(member => {
			return (
				Number(mobile_no) === member.mobile_no &&
				password === member.password
			);
		});

		if (member.length === 0) {
			alert("Login Error : Mobile number and Password do not match !!!");
			return true;
		}
		return member[0];
	}

	memberLogIn = async () => {
		var mobile_no = this.refs.mobile_no.value;
		var password = this.refs.password.value;

		const res = await fetch("/login");
		const body = await res.json();
		if (res.status !== 200) throw Error(body.message);

		var member = this.ifError(mobile_no, password, body);
		if (member === true) return;
		else
			this.setState({
				member_id: member.member_id,
				member_name: member.member_name
			});
	};

	render() {
		let id = this.state.member_id;
		let name = this.state.member_name;
		return (
			<div>
				<font> Login here :</font>
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
				<button onClick={this.memberLogIn}>Login</button>
				{id !== null && name !== null ? (
					<Home member_id={id} member_name={name} />
				) : null}
			</div>
		);
	}
}

export default UserLogin;
