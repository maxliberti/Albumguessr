require('dotenv').config();
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node')
const token = process.env.TOKEN
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);


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
    return albums;
}

async function getUserAlbums() {
    const me = await getMyData()
    if (me) {
        let albums = await makeAlbumObj();
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
