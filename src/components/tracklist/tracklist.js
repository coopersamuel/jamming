import React from 'react';
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
                        <div className="Track">
                            <div className="Track-information">
                                <h3>{track.title}</h3>
                                <p>{track.artist} | {track.album}</p>
                            </div>
                            <a className="Track-action" onClick={boundTrackClick}>{this.props.trackAction}</a>
                        </div>
                    );
                })}
          </div>
        );
    }
}

export default Tracklist;