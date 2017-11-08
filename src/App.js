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
      selectedTracks : []
    };

    this.handlePlusClick = this.handlePlusClick.bind(this);    
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  handlePlusClick(eventTrack) {
    this.setState({
      selectedTracks : this.state.selectedTracks.concat(eventTrack)
    });
  }

  handleMinusClick(eventTrack) {
    // this isn't working yet...
    let deleteIndex = this.state.selectedTracks.indexOf(eventTrack);
    console.log(deleteIndex);
    this.setState({
      selectedTracks : this.state.selectedTracks.slice(deleteIndex)
    });
  }

  async searchSpotify(searchTerm) {
    let searchResults = await Spotify.search(searchTerm);

    this.setState({
      tracks : searchResults
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
            <Playlist tracks={this.state.selectedTracks} handleActionClick={this.handleMinusClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
