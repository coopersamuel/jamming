import React from 'react';
import './track.css';

class Track extends React.Component {
    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.title}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className="Track-action" onClick={this.props.onTrackAction}>{this.props.trackAction}</a>
            </div>
        );
    }
}

export default Track;