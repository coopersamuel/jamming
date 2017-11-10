import React from 'react';
import Tracklist from '../tracklist/tracklist';
import './playlist.css';
import { GoPencil, GoThreeBars } from 'react-icons/lib/go';

class Playlist extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        trackAction : '-'
      }

      this.toggleReorder = this.toggleReorder.bind(this);
    }

    toggleReorder() {
      if (this.state.trackAction === '-') {
        this.setState({
          trackAction : <GoThreeBars size={15} />
        });
      } else {
        this.setState({
          trackAction : '-'
        });
      }
    }

    render() {
        return (
          <div className="Playlist">
            <div>
              <input value={this.props.playlistName} onChange={this.props.onInputChange} />
              <GoPencil className="Playlist-reorder" size={20} onClick={this.toggleReorder} />
            </div>
            <div className="TrackList">
              <Tracklist tracks={this.props.tracks} onActionClick={this.props.handleActionClick} trackAction={this.state.trackAction} />
            </div>
            <a className="Playlist-save" onClick={this.props.onPlaylistSave}>SAVE TO SPOTIFY</a>
          </div>
        );
    }
}

export default Playlist;