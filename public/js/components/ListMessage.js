import React from 'react';

export class ListMessage extends React.Component {
	constructor (props) {
		super(props);
	};

	render () {
		return (
			<div className="div-messages">
				<ul className="messages">
					{this.props.messages.map((message, i) => {
	          return (
	            <li key={i}>
	              {message}
	            </li>
	          );
	        })}
				</ul>
			</div>
		);
	};
};