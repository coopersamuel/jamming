import React from 'react';
import Track from '../track/track';
import './tracklist.css';

class Tracklist extends React.Component {
    onTrackAction(track, event) {
        //console.log(track);
        return this.props.onActionClick(track);
    }

    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    // Binding the track object to the plus/minus button event
                    let boundTrackClick = this.onTrackAction.bind(this, track);

                    return (
                        <Track key={track.id} track={track} trackAction={this.props.trackAction} onTrackAction={boundTrackClick} />
                    );
                })}
          </div>
        );
    }
}

export default Tracklist;