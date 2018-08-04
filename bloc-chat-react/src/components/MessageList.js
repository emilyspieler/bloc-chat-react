import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
  super(props);
  this.state = {
  messages: [],
  };
 this.messagesRef = this.props.firebase.database().ref('messages');
 this.handleChange = this.handleChange.bind(this);
}

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) })
  });
  console.log(this.state.messages);
}

handleChange(e) {
     this.setState({ message: e.target.value });
             }

  render() {
    return (
      <section className="messages">
      <div id='messageList'>
         <ul>
          {this.state.messages.map((message, index) =>
          <li key={index}>{message.content}</li>
          )
          }
          </ul>
        </div>
        </section>
      );
  }
}

export default MessageList;
