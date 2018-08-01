import React, { Component } from 'react';

class Library extends Component {

   render() {
    return (
      <section className="library">
      {this.messages}
      </section>
     );
   }
 }

export default Library;
