import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    userSignedIn: false,
  };
}

  signInWithPopup() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
  this.setState ({ userSignedIn: true });
    }

  signOutWithPopup() {
  this.props.firebase.auth().signOut();
  this.setState ({ userSignedIn: false });
    }

    componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      })
    }

   render() {
      return <div className='signIn'>
          {this.state.userSignedIn ? <button onClick={() => this.signOutWithPopup()}>Sign-out</button> : <button onClick={() => this.signInWithPopup()}>Sign-in</button>}
          {this.props.user ? this.props.user.displayName : <h3>Guest</h3>}
        </div>
      }
}

export default User;
