import React from 'react';

export class ListMessage extends React.Component {
	constructor (props) {
		super(props);
	};

	render () {
		return (
			<div className="div-messages">
				<ul className="messages">
					{this.props.messages.map((m, i) => {
	          return (
	            <li key={i}>
            		{m.name}
            		<span>:&nbsp;</span>
	              {m.text}
	            </li>
	          );
	        })}
				</ul>
			</div>
		);
	};
};