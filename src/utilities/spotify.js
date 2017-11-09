import apiKeys from '../config';

const clientId = apiKeys.clientId;
const clientSecret = apiKeys.clientSecret;
const redirectUri = 'http://localhost:3000/';
let accessToken;

let Spotify = {
    authorize() {
        let url = window.location.href;
        let expirationTime;

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

    async search(searchTerm) {
        Spotify.authorize();

        try {
            let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
                headers : {Authorization : `Bearer ${accessToken}`}
            });

            if (response.ok) {
                let jsonResponse = await response.json();

                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            id: track.id,
                            title: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        };
                    });
                } else {
                    return [];
                }
            }

            throw new Error('Request failed.');
        } catch (error) {
            console.log(error);
        }
    },

    async createSpotifyPlaylist(trackUris, playlistName) {
        if (!trackUris || !playlistName) {
            console.log('triggering');
            return;
        }

        let authHeader = { Authorization : `Bearer ${accessToken}` };
        let userId;
        let playlistId;

        // First retrieve the user's spotify ID
        try {
            let response = await fetch('https://api.spotify.com/v1/me', { headers : authHeader });

            if (response.ok) {
                let jsonResponse = await response.json();

                if (jsonResponse.id) {
                    userId = jsonResponse.id;
                }
            } else {
                throw new Error('Request failed.');                
            }

        } catch (error) {
            console.log(error);
        }

        // Next, create a playlist with the given playlistName and retrieve it's ID
        try {
            let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method : 'POST',
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ 
                    name : playlistName,
                    description : 'Playlist created by the Jammming App' 
                })
            });

            if (response.ok) {
                let jsonResponse = await response.json();

                if (jsonResponse.id) {
                    playlistId = jsonResponse.id;
                }
            } else {
                throw new Error('Request failed.');                
            }

        } catch (error) {
            console.log(error);
        }

        // Finally, POST the array of trackUris to the playlist ID
        try {
            let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                method : 'POST',
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ uris : trackUris })
            });

            if (!response.ok) {
                throw new Error('Request failed.');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export default Spotify;