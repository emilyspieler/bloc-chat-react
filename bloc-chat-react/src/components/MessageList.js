import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props) {
  super(props);
  this.state = {
  messages: [],
  newMessages: ''
  };
 this.messagesRef = this.props.firebase.database().ref('messages');
 this.createMessage = this.createMessage.bind(this);
}

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) })
  });

}

createMessage(e){
     e.preventDefault();
      if (!this.props.activeRoom || !this.state.messages) { return }
     this.setState({ messages: [...this.state.newMessages], newMessages: '' });
     this.messagesRef.push({
       content: this.state.newMessages,
       sentAt: firebase.database.ServerValue.TIMESTAMP,
       username: this.props.user.displayName || "guest",
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
          <li key={index}>{message.content}  {message.sentAt}  {message.username}</li>
          )
          }
          </ul>
        </div>
        </section>
      );
  }
}

export default MessageList;
