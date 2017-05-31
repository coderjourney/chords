import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChordEditor from './components/ChordEditor';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="workspace">
          <ChordEditor />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
