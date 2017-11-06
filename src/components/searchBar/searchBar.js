import React from 'react';
import './searchBar.css';
import Spotify from '../../utilities/spotify'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album or Artist" />
                <a onClick={Spotify.authorize}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;
