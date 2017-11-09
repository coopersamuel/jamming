import React from 'react';
import Tracklist from '../tracklist/tracklist';
import './playlist.css';

class Playlist extends React.Component {
    render() {
        return (
          <div className="Playlist">
            <input value={this.props.playlistName} onChange={this.props.onInputChange} />
            <div className="TrackList">
              <Tracklist tracks={this.props.tracks} onActionClick={this.props.handleActionClick} trackAction='-' />
            </div>
            <a className="Playlist-save" onClick={this.props.onPlaylistSave} >SAVE TO SPOTIFY</a>
          </div>
        );
    }
}

export default Playlist;