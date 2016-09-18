import './css/site.css';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';

import { ListMessage } from './js/components/ListMessage';

const socket = io();

class App extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			message: '',
			messages: []
		}
	};

	sendMessage (msg) {
		let { messages } = this.state;
    messages.push(msg);
    this.setState({ messages });
	};

	componentDidMount() {
		socket.on('send-message', (e) => this.sendMessage(e));
  };

	handleSubmit (e) {
		e.preventDefault();
		socket.emit('send-message', this.refs.m.value);
  	this.refs.m.value = '';
	};

	render () {
		return (
			<div className="">
				<ListMessage messages={this.state.messages} />
				<div className="div-form">
			    <form ref="form" className="form-general" onSubmit={(e) => this.handleSubmit(e)}>
			      <input ref="m"/>
			      <button>Send</button>
			    </form>
		    </div>
	    </div>
		)
	};
};

render(<App />, document.getElementById('root'));