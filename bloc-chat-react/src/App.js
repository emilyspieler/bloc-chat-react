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


  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <div id='RoomTitle'>
          <RoomList firebase={firebase} />
        </div>
        <div id= 'Messages'>
        <MessageList firebase={firebase} />
        </div>
      </div>
    );
  }
}

export default App;
