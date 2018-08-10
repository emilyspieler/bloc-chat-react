import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    userSignIn: false,
    guestSignIn: false
  };
}

  signInNoUser(e) {
  e.preventDefault();
  this.props.firebase.auth().signInAnonymously();
  this.setState ({ guestSignIn: true });
  }

  signOutNoUser(){
  this.props.firebase.auth().signOut();
  this.setState ({ guestSignIn: false });
  }

  signInWithPopup() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
  this.setState ({ userSignIn: true });
    }

  signOutWithPopup() {
  this.props.firebase.auth().signOut();
  this.setState ({ userSignIn: false });
    }

    componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      })
    }

   render() {
      return <div className='signIn'>
          {this.state.userSignIn ? <button onClick={() => this.signOutWithPopup()}>Sign out</button> : <button onClick={() => this.signInWithPopup()}>Sign in</button>}
          {this.state.guestSignIn ? <button onClick={() => this.signOutNoUser()}>Guest Sign Out</button> : <button onClick={(e) => this.signInNoUser(e)}>Guest Sign in</button>}
          {this.props.user ? this.props.user.displayName || 'Guest' : <h3>Please Sign In!</h3>}
        </div>
      }
}

export default User;
