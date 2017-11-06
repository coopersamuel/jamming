import React from 'react';
import './searchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album or Artist" />
                <a onClick={this.props.searchSpotify}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;
