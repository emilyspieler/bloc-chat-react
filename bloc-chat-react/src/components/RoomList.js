import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
  super(props);
  this.state = {
  rooms: [],
  newRoomDescription: ''
};
this.roomsRef = this.props.firebase.database().ref('Rooms');
this.createRoom = this.createRoom.bind(this);
}

createRoom(e){
  this.roomsRef.push({
    Name: this.state.newRoomDescription
  });
}

handleChange(e) {
  e.preventDefault();
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
  return (
    <section id='submit'>
    <div className="create-room">
    <form onSubmit={this.createRoom} >
      <input type="text" value={this.state.newRoomDescription} onChange={ (e) => this.handleChange(e) }/>
      <input type="submit" id="submit" name="submission" />
    </form>
    </div>
    <table id='roomList'>
       <tbody>
        {this.state.rooms.map((rooms, index) =>
        <tr key={index}>
        <td>{rooms.Name}</td>
        </tr>
        )
        }
      </tbody>
      </table>
      </section>
        );
        }
        }


export default RoomList;
