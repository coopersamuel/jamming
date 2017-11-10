import React from 'react';
import SearchBar from './components/searchBar/searchBar';
import ResultsList from './components/resultsList/resultsList';
import Playlist from './components/playlist/playlist';
import Spotify from './utilities/spotify'
import './App.css';

// Hardcode for now
// const track = {
//   id : '', // need an ID later
//   title : 'Tiny Dancer',
//   artist : 'Elton John',
//   album : 'Madman Across The Water'
// };

// const track2 = {
//   id : '', // need an ID later
//   title : 'Naked As We Came',
//   artist : 'Iron & Wine',
//   album : 'The Shepherd\'s Dog'
// };

//const tracks = [track, track2, track, track2, track, track2];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks : [],
      selectedTracks : [],
      playlistName : 'New Playlist'
    };

    this.handlePlusClick = this.handlePlusClick.bind(this);    
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.createSpotifyPlaylist = this.createSpotifyPlaylist.bind(this);
  }

  handlePlusClick(eventTrack) {
    if (!this.state.selectedTracks.includes(eventTrack)) {
      let tempTracks = this.state.selectedTracks.slice(); // copies array
      tempTracks.push(eventTrack); // add new track

      this.setState({
        selectedTracks : tempTracks // update state
      });
    }
  }

  handleMinusClick(eventTrack) {    
    let tempTracks = this.state.selectedTracks.slice(); // copies array
    let deleteIndex = tempTracks.indexOf(eventTrack); // finds index to delete
    tempTracks.splice(deleteIndex, 1); // removes track from temp array

    this.setState({
      selectedTracks : tempTracks // update state
    });
  }

  handleNameChange(event) {
    this.setState({
      playlistName : event.target.value
    });
  }

  async searchSpotify(searchTerm) {
    let searchResults = await Spotify.search(searchTerm);

    this.setState({
      tracks : searchResults
    });
  }

  async createSpotifyPlaylist() {
    // Filter out the track URIs, you don't need to send the whole object
    let trackUris = this.state.selectedTracks.map(track => {
      return track.uri;
    });

    await Spotify.createSpotifyPlaylist(trackUris, this.state.playlistName);

    this.setState({
      playlistName : 'New Playlist',
      selectedTracks: []
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify} />
          <div className="App-playlist">
            <ResultsList tracks={this.state.tracks} handleActionClick={this.handlePlusClick} />
            <Playlist tracks={this.state.selectedTracks} 
                      handleActionClick={this.handleMinusClick} 
                      playlistName={this.state.playlistName} 
                      onInputChange={this.handleNameChange}
                      onPlaylistSave={this.createSpotifyPlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
