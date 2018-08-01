import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
  super(props);
  this.state = {
  messages: []
  };
  this.roomsRef = this.props.firebase.database().ref('Rooms');
}

availableRooms = (Rooms) => {
  console.log('roomsList');
}

componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.messages.concat( room ) })
     });
   }

  render() {
    return (
      <div className="MessageList">
      <table id='MessagesList'>
         <tbody>
          {this.state.messages.map((messages, index) =>
          <tr key={index}>
          <td>{messages.Name}</td>
          </tr>
          )
          }
        </tbody>
        </table>
      <div className="availableRooms">
      {this.props.availableRooms}
      </div>
      </div>
    );
  }
}

export default MessageList;
