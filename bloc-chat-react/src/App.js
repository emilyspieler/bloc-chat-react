import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
      <RoomList />
    );
  }
}

export default App;
