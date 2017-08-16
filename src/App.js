import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import ChordEditor from './components/ChordEditor';
import SongList from './components/SongList';
import { app, base } from './base';

function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
          ? <Component {...props} {...rest} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> } />
  )
}

function ShowRoute({component: Component, items, param, ...rest}) {
  return (
    <Route
      {...rest}
      render={({match, ...props}) => {
        if (rest.requireAuth === true && !rest.authenticated) {
          return (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
          )
        }

        const item = items[match.params[param]]
        if (item) {
          return <Component item={item} {...props} match={match} {...rest}/>
        } else {
          return <h1>Not Found</h1>
        }
      }}
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.addSong = this.addSong.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      songs: { }
    };
  }

  addSong(title) {
    const songs = {...this.state.songs};
    const id = Date.now();
    songs[id] = {
      id: id,
      title: title,
      chordpro: "",
      owner: this.state.currentUser.uid
    };

    this.setState({songs});
  }

  updateSong(song) {
    const songs = {...this.state.songs};
    songs[song.id] = song;

    this.setState({songs});
  }

  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false,
        })

        this.songsRef = base.syncState(`songs/${user.uid}`, {
          context: this,
          state: 'songs'
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        })

        base.removeBinding(this.songsRef);
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.songsRef);
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )
    }

    return (
      <div style={{maxWidth: "1160px", margin: "0 auto"}}>
        <BrowserRouter>
          <div>
            <Header addSong={this.addSong} authenticated={this.state.authenticated} />
            <div className="main-content" style={{padding: "1em"}}>
              <div className="workspace">
                <Route exact path="/login" render={(props) => {
                  return <Login setCurrentUser={this.setCurrentUser} {...props} />
                }} />
                <Route exact path="/logout" component={Logout} />
                <AuthenticatedRoute
                  exact
                  path="/songs"
                  authenticated={this.state.authenticated}
                  component={SongList}
                  songs={this.state.songs} />
                <ShowRoute
                  path="/songs/:songId"
                  component={ChordEditor}
                  authenticated={this.state.authenticated}
                  requireAuth={true}
                  param="songId"
                  updateSong={this.updateSong}
                  items={this.state.songs} />
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
