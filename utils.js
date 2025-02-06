require('dotenv').config();
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node')
const token = process.env.TOKEN
git init --bare
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

    const albums = [];

    console.log("-------------------------++++-------------------------")
    for (const item of album_response) {
        const album = item.album;

        const artists = album.artists;
        let artists_arr = []
        for (const artist of artists) {
            artists_arr.push(artist.name);
        }

        const images = album.images;
        let images_arr = [];
        for (const image of images) {
            images_arr.push(image.url);
        }

        // 0 = name, 1 = artist(s), 2 = cover art, 3 = release date
        albums[album.id] = [album.name, artists_arr, images_arr, album.release_date];
    }

    //console.log(albums['66at85wgO2pu5CccvqUF6i'][0]);
    return albums;


}

async function main() {
    const me = await getMyData()
    if (me) {
        albums = await makeAlbumObj()
        if (albums) {
            console.log(albums)
        }
    }
}

main()