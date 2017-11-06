import apiKeys from '../config';

const clientId = apiKeys.clientId;
const clientSecret = apiKeys.clientSecret;
const redirectUri = 'https://localhost:3000/callback/';
const scopes = 'user-read-private user-read-email';
let accessToken;

let Spotify = {
    authorize() {
        if (accessToken) {
            return new Promise(resolve => {
                resolve(accessToken);
            });
        }

        window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`);                
        // Now grab the access token from the URL
    },

    search(searchTerm) {
        // Make sure to call authorize here
    }
}

export default Spotify;