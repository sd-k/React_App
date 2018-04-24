import React from "react";
class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h3>
					Hello {this.props.member_id + " " + this.props.member_name}
				</h3>
			</div>
		);
	}
}
export default Home;
