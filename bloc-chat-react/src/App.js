import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyAJZrui3Dt1AKLqYQssnzTHC1uqVCCJ8mE",
  authDomain: "bloc-chat-react-12319.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-12319.firebaseio.com",
  projectId: "bloc-chat-react-12319",
  storageBucket: "bloc-chat-react-12319.appspot.com",
  messagingSenderId: "978389450276"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      activeRoom: undefined,
    };
    this.handleRoomClick = this.handleRoomClick.bind(this);
    }

    handleRoomClick(room) {
    this.setState({ activeRoom: room });
    console.log(this.state.messages);
  }

  render() {
  return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <div id='RoomTitle'>
          <RoomList firebase={firebase}  handleRoomClick={this.handleRoomClick}
            activeRoom={this.state.activeRoom} />
        </div>
        <div id= 'Messages'>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom}
         />
         <h3>{this.state.activeRoom}</h3>
        </div>
      </div>
    );
  }
}

export default App;
