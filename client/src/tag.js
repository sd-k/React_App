import React from "react";
var tag = {};
tag.Para = props => {
	return <p>{props.text}</p>;
};

tag.Button = props => {
	return (
		<button onClick={props.onClick} disabled={props.disabled} id={props.id}>
			{props.value}
		</button>
	);
};
tag.Lable = props => {
	return (
		<div>
			<font>{props.value}</font>
		</div>
	);
};
tag.Text = props => {
	return (
		<div>
			<input
				type="text"
				placeholder={props.message}
				ref={props.ref}
				size="30"
			/>
		</div>
	);
};
tag.Password = props => {
	return (
		<div>
			<input
				type="password"
				size="30"
				placeholder={props.message}
				ref={props.reference}
			/>
		</div>
	);
};
export default tag;
