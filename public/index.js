import './css/site.css';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import Guid from 'guid';

import { ListMessage } from './js/components/ListMessage';
import { ListUser } from './js/components/ListUser';
import { Tabs } from './js/components/Tabs';

const socket = io();

class App extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			messages: [{for: 'everyone', name: 'Everyone', msgs: [], selected: true}],
			userDestiny: null,
			user: {},
			users: []
		};
	};

	sendMessage (msg) {
		let messages = this.state.messages;
		let found = false;

		messages.forEach(f => {
			//if (f.for === msg.for) {
				//|| this.state.user.id == msg.user.id
			if (f.for === msg.user.id || f.for === msg.for || msg.for === 'everyone') {
				f.msgs.push(msg);
				found = true;
			};
		});
		if (!found && msg.for === this.state.user.id) {
			messages.push({
				for: msg.user.id,
				msgs: [msg],
				name: msg.user.name,
				selected: false
			});
		}
		this.setState({messages});
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
		const destiny = this.state.messages.filter(f => f.selected == true);
		if (message) {
			socket.emit('send-message', { user: this.state.user, message, for: destiny[0].for });
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
		const id = e.currentTarget.dataset.id;
		const name = e.currentTarget.dataset.name;
		const messages = this.state.messages;
		const msgSelect = messages.filter(f => { return f.for === id});
		if (msgSelect.length === 0) {
			messages.forEach(f => {
				f.selected = false;
			});
			messages.push({
				for: id,
				name: name,
				msgs: [],
				selected: true
			});
			this.setState({messages});

		} else {
			messages.forEach((f) => {
				f.selected = (f.for === id);
			});
			this.setState({messages});
		}
	};

	selectUserTab (e) {
		let messages = this.state.messages;
		messages.forEach(f => {
			if (f.for === e.currentTarget.dataset.id) {
				f.selected = true;
			} else {
				f.selected = false;
			}
		});
		this.setState({messages});
	};

	closeUserTab (e) {
		let messages = this.state.messages;
		let indice = 0;
		messages[0].selected = true;

		messages.forEach((f,i) => {
			if (f.for === e.currentTarget.dataset.id) {
				indice = i;
			}
		});
		messages.splice(indice, 1);

		this.setState({messages});
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
					<div className="user-logged">
						<span>User:&nbsp;</span>
						{this.state.user.name}
					</div>
					<Tabs tabs={this.state.messages} selectTab={(e) => this.selectUserTab(e)}
						closeTab={(e) => this.closeUserTab(e)} />
				</div>
				<div className="content-message-user">
					<ListMessage messages={this.state.messages.filter(f => f.selected == true)[0].msgs} />
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