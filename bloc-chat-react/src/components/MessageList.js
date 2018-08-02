import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
  super(props);
  this.state = {
  messages: [],
  activeRoom: true
  };
  this.messagesRef = this.props.firebase.database().ref('messages');
  this.createMessage = this.createMessage.bind(this);
}

componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) })
     });
   }

   createMessage(e){
     e.preventDefault();
     if (!this.state.messages) { return }
     this.setState({...this.state.messages});
     this.messagesRef.push({
       content: this.state.messages
     });
   }

   handleMessageChange(e) {
       this.setState({ newMessages: e.target.value});
      }

  render() {
    return (
      <section className="submit-message">
      <h2 className="active-room">{this.props.activeRoom.name}</h2>
      <div className="create-message">
      <h1>Write your message!</h1>
      <form onSubmit={this.createMessage}>
        <input type="text" value={this.state.createMessage} onChange={ (e) => this.handleMessageChange(e) } />
        <input type="submit" id="submit" name="submission" />
      </form>
      </div>
      <table id='messageList'>
         <tbody>
          {this.state.messages.map((rooms, index) =>
          <tr key={index}>
          <td className= 'messages'>{this.messages}</td>
          </tr>
          )
          }
        </tbody>
        </table>
        </section>
      );
  }
}

export default MessageList;
