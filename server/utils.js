require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node')
const fs = require('fs');
const path = require('path');

// get token file
const TOKEN_FILE = path.join(__dirname, 'tokens.json');

// put them into object
let tokens = {}
if (fs.existsSync(TOKEN_FILE)) {
    tokens = JSON.parse(fs.readFileSync(TOKEN_FILE));
}

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

// set access token from the file
if (tokens.access_token) {
    spotifyApi.setAccessToken(tokens.access_token);
} else {
    console.error('No access token');
    process.exit(1);
}

async function getMyData() {
    try {
        const me = await spotifyApi.getMe();
        return me;
    } catch(err) {
        console.log(err);
    }
}

async function makeAlbumObj() {
    const data = await spotifyApi.getMySavedAlbums()
    const album_response = data.body.items;
    console.log(album_response);

    const albums = { };

    console.log("-------------------------++++-------------------------")
    for (const item of album_response) {
        const album = item.album;

        // these two dont work lol
        const artists = album.artists;
        let artists_obj = Array();
        for (artist of artists) {
            artists_obj.push(artist.name);
        }

        const images = album.images;
        let images_obj = Array();
        for (image of images) {
            images_obj.push(image.url);
        }

        // 0 = name, 1 = artist(s), 2 = cover art, 3 = release date
        albums[album.id] = {
            'name' : album.name, 'images' : images_obj, 'artists' : artists_obj, 'release' : album.release_date
        };
    }

    //console.log(albums['66at85wgO2pu5CccvqUF6i'][0]);
    let final_albums = {albums}
    return final_albums;
}

async function getUserAlbums() {
    const me = await getMyData()
    if (me) {
        let albums = await makeAlbumObj();
        console.log(albums);
        if (albums) {
                return albums;
        } else {
            console.log("No albums found!");
        }
    } else {
        console.log("My data not found");
    }
}

getUserAlbums();
module.exports = getUserAlbums;
