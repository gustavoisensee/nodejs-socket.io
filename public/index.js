import './css/site.css';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import Guid from 'guid';

import { ListMessage } from './js/components/ListMessage';
import { ListUser } from './js/components/ListUser';

const socket = io();

class App extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			messages: [],
			user: {},
			users: []
		}
	};

	sendMessage (msg) {
		let { messages } = this.state;
    messages.push(msg);
    this.setState({ messages });
	};

	sendUser (users) {
    this.setState({ users: users.filter(user => {return user.id !== this.state.user.id}) });
	};

	componentDidMount() {
		socket.on('send-message', (e) => this.sendMessage(e));
		socket.on('send-user', (e) => this.sendUser(e));
  };

	submit (e) {
		e.preventDefault();
		const message = this.refs.message.value;
		if (message) {
			socket.emit('send-message', { user: this.state.user, message });
	  	this.refs.message.value = '';
		}
	};

	userEnter (e)	{
		const user = this.refs.user.value;
		if (user) {
			const _user = {
	    	id: Guid.raw(),
	    	name: user
	    };
			socket.emit('send-user', _user);
			this.setState({ user: _user });
  		this.refs.user.value = '';	
  		this.refs.userModalContent.style.display = 'none';
		}
	};

	render () {
		return (
			<div className="root">
				<div ref="userModalContent" className="user-modal-content">
					<div className="user-modal">
						<span>User</span>
						<input ref="user" />
						<button onClick={(e) => this.userEnter(e)} className="btn">Enter</button>
					</div>
				</div>
				<div className="content-header-user">
					<span>User:&nbsp;</span>
					{this.state.user.name}
				</div>
				<div className="content-message-user">
					<ListMessage messages={this.state.messages} />
					<ListUser users={this.state.users} />
				</div>
				<div className="div-form">
			    <form ref="form" className="form-general" onSubmit={(e) => this.submit(e)}>
			      <input ref="message" required />
			      <button className="btn">Send</button>
			    </form>
		    </div>
	    </div>
		)
	};
};

render(<App />, document.getElementById('root'));