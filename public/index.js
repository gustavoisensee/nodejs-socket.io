import './css/site.css';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import Guid from 'guid';

import { ListMessage } from './js/components/ListMessage';
import { ListUser } from './js/components/ListUser';

const socket = io();
let messages = [{for: 'everyone', msgs: [], selected: true}];

class App extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			message: messages[0],
			userDestiny: null,
			user: {},
			users: []
		}
	};

	sendMessage (msg) {
		let user = '';

		if (this.state.userDestiny) {
			let found = false;
			messages.forEach(f => {
				if (f.for === this.state.userDestiny.id) {
					f.msgs.push(msg);
					found = true;
					this.setState({message: f});
				}
			});
			if (!found) {
				let message = {
					for: this.state.userDestiny.id,
					msgs: [msg]
				};
				messages.push(message);
				this.setState({message});
			}

		} else {
			messages[0].msgs.push(msg); //for everyone
			this.setState({message: messages[0]});
		}
    document.getElementsByClassName('div-messages')[0].scrollTop = 99999999999;
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

	selectUser (e) {
		console.log('select user');
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
					<ListMessage messages={this.state.message.msgs} />
					<ListUser users={this.state.users} selectUser={(e) => this.selectUser(e)} />
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