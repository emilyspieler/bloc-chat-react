import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User/User';

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
      activeRoom: "",
      user: ""
      };
    this.handleRoomClick = this.handleRoomClick.bind(this);
      }

  handleRoomClick(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState ({ user: user });
  }

  render() {

  return (
      <div className="App">
        <header>
          <h1>Messenger</h1>
        </header>

        <div className="container">
          <div className="row">
          <div className="col-sm-3">
            <h3>You are in: {this.state.activeRoom.Name}</h3>

            <div id='RoomTitle'>
            <RoomList firebase={firebase}  handleRoomClick={this.handleRoomClick}
            activeRoom={this.state.activeRoom} />
            </div>
          </div>


        <div className="col-sm-9">
        <div id= 'Messages'>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}
         />
         </div>


         <User firebase={firebase} setUser={(user) => this.setUser(user)}
          user={this.state.user}
         />
           </div>
           </div>

      </div>
      </div>


    );
  }
}

export default App;
