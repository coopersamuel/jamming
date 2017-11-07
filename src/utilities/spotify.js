import apiKeys from '../config';

const clientId = apiKeys.clientId;
const clientSecret = apiKeys.clientSecret;
const redirectUri = 'https://localhost:3000/';
let accessToken;
let expirationTime;

let Spotify = {
    authorize() {
        let url = window.location.href;

        if (accessToken) {
            return accessToken;
        } else if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
            // Pull out the accessToken from the URL
            let match = url.match(/access_token=([^&]*)/);
            accessToken = match[1];
            // Pull out the expirationTime from the URL
            match = url.match(/expires_in=([^&]*)/);
            expirationTime = match[1];

            // Set the accessToken to empty string when time is up
            window.setTimeout(() => accessToken = '', expirationTime * 1000);
            // Remove the accessToken in the URL so that we don't try to grab it again
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`);                            
        }
    },

    search(searchTerm) {
        Spotify.authorize();
    }
}

export default Spotify;