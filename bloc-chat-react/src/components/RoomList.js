import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
  super(props);
  this.state = {
  rooms: [
  ],
  newRoomDescription: ''
};
this.roomsRef = this.props.firebase.database().ref('Rooms');
this.createRoom = this.createRoom.bind(this);
}

createRoom(e){
  e.preventDefault();
  if (!this.state.newRoomDescription) { return }
  this.setState({ rooms: [...this.state.newRoomDescription], newRoomDescription: '' });
  this.roomsRef.push({
    Name: this.state.newRoomDescription
  });
}

handleChange(e) {
    this.setState({ newRoomDescription: e.target.value});
   }

componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }

render() {
        const formSubmitButton = {
          textAlign:"left"
        }

  return (
    <section id='submit'>
    <div id='roomList'>
       <ul>
        {this.state.rooms.map((room, index) =>
        <li key={index} className= 'room' onClick={() => this.props.handleRoomClick(room)}>{room.Name}</li>
        )
        }
        </ul>
      </div>
      <div className="create-room">
      <form style={formSubmitButton} onSubmit={this.createRoom} >
        <input type="text" value={this.state.newRoomDescription} onChange={ (e) => this.handleChange(e) } />
        <input type="submit" id="submit" name="submission" />
      </form>
      </div>
      </section>
        );
        }
        }


export default RoomList;
