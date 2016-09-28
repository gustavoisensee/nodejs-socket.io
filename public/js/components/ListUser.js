import React from 'react';

export class ListUser extends React.Component {
	constructor (props) {
		super(props);
	};

	render () {
		return (
			<div className="div-users">
				<ul className="users">
					{this.props.users.map((user, i) => {
	          return (
	            <li key={i} data-id={user.id} data-name={user.name}
	            	onDoubleClick={this.props.selectUser}>
            		{user.name}
	            </li>
	          );
	        })}
				</ul>
			</div>
		);
	};
};