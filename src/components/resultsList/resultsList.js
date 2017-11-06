import React from 'react';
import Tracklist from '../tracklist/tracklist';
import './resultsList.css';

class ResultsList extends React.Component {
    render() {
        return (
            <div className="SearchResults">
              <h2>Results</h2>
              <Tracklist tracks={this.props.tracks} onActionClick={this.props.handleActionClick} trackAction='+' />
            </div>
        );
    }
}

export default ResultsList;