import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChordEditor from './components/ChordEditor';
import SongList from './components/SongList';
import { base } from './base';

class App extends Component {
  constructor() {
    super();
    this.addSong = this.addSong.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.state = {
      songs: { }
    };
  }

  addSong(title) {
    const songs = {...this.state.songs};
    const id = Date.now();
    songs[id] = {
      id: id,
      title: title,
      chordpro: ""
    };

    this.setState({songs});
  }

  updateSong(song) {
    const songs = {...this.state.songs};
    songs[song.id] = song;

    this.setState({songs});
  }

  componentWillMount() {
    this.songsRef = base.syncState('songs', {
      context: this,
      state: 'songs'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.songsRef);
  }

  render() {
    return (
      <div style={{maxWidth: "1160px", margin: "0 auto"}}>
        <BrowserRouter>
          <div>
            <Header />
            <div className="main-content" style={{padding: "1em"}}>
              <div className="workspace">
                <Route exact path="/songs" render={(props) => {
                  return (
                    <SongList songs={this.state.songs} />
                  )
                }} />
                <Route path="/songs/:songId" render={(props) => {
                  const song = this.state.songs[props.match.params.songId];
                  return (
                    song
                    ? <ChordEditor song={song} updateSong={this.updateSong} />
                    : <h1>Song not found</h1>
                  )
                }} />
              </div>
            </div>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
