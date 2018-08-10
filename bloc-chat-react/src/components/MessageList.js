import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {

  constructor(props) {
  super(props);
  this.state = {
  messages: [],
  newMessages: '',
  };
 this.messagesRef = this.props.firebase.database().ref('messages');
 this.createMessage = this.createMessage.bind(this);
 this.convertTimestamp = this.convertTimestamp.bind(this);
}

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) })
  });
}

convertTimestamp(timestamp) {
  var d = new Date(timestamp),
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh === 0) {
		h = 12;
	}

	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

	return time;
}

createMessage(e){
     e.preventDefault();
      if (!this.props.activeRoom || !this.state.messages) { return }
     this.setState({ messages: [...this.state.newMessages], newMessages: '' });
     this.messagesRef.push({
       content: this.state.newMessages,
       sentAt: firebase.database.ServerValue.TIMESTAMP,
       username: this.props.user.displayName || 'guest',
       roomId: this.props.activeRoom.key
     });
   }

handleMessageChange(e) {
     this.setState({ newMessages: e.target.value});
    }

  render() {
    return (
      <section className="messages">
      <div className="create-message">
    <h1>Write your message!</h1>
    <form onSubmit={this.createMessage}>
      <input type="text" value={this.state.newMessages} onChange={ (e) => this.handleMessageChange(e) } />
      <input type="submit" id="submit" name="submission" />
    </form>
    </div>
      <div id='messageList'>
         <ul>
          {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
          <li key={index}>{message.content}  {this.convertTimestamp(message.sentAt)}  {message.username}</li>
          )
          }
          </ul>
        </div>
        </section>
      );
  }
}

export default MessageList;
