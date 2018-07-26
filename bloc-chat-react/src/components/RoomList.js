import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
  super(props);
  this.state = {
  rooms: []
};
this.roomsRef = this.props.firebase.database().ref('Rooms');
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
      );
      }
      }


export default RoomList;
