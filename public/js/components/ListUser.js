import React from 'react';

export class ListUser extends React.Component {
	constructor (props) {
		super(props);
	};

	render () {
		return (
			<div className="div-users">
				<ul className="uers">
					{this.props.users.map((user, i) => {
	          return (
	            <li key={i} onDoubleClick={this.props.selectUser}>
            		{user.name}
	            </li>
	          );
	        })}
				</ul>
			</div>
		);
	};
};