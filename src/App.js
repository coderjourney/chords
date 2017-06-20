import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChordEditor from './components/ChordEditor';

class App extends Component {
  constructor() {
    super();
    this.updateSong = this.updateSong.bind(this);
    this.state = {
      song: { chordpro: "Type lyrics here." }
    };
  }

  updateSong(song) {
    this.setState({song: song});
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="workspace">
          <ChordEditor song={this.state.song} updateSong={this.updateSong}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
