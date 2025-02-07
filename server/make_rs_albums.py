import json
from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth, SpotifyClientCredentials

load_dotenv()

CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
SECRET_ID = os.getenv('SPOTIFY_CLIENT_SECRET')

auth_manager = SpotifyClientCredentials(CLIENT_ID, SECRET_ID)
sp = spotipy.Spotify(auth_manager=auth_manager)

def makeAlbumList():
    playlist = sp.playlist_items('0E7Rl9FfMJVJTxok98chvE', additional_types='track')
    offset = 0
    album_list = []
    end = playlist['total']

    while offset <= end:
        playlist_offset = sp.playlist_items('0E7Rl9FfMJVJTxok98chvE', offset=offset, additional_types='track')
        for item in playlist_offset['items']:
            id = item['track']['album']['id']
            if id not in album_list:
                album_list.append(id)
        offset += 100

    return album_list

def makeDefaultObj():
    album_ids = makeAlbumList()
    album_info = {}

    for lp in album_ids:
        album = sp.album(lp)

        artists = album['artists']
        artists_arr = []
        for artist in artists:
            artists_arr.append(artist['name'])

        images = album['images']
        images_arr = []
        for image in images:
            images_arr.append(image['url'])

        album_info[lp] = [album['name'], artists_arr, images_arr, album['release_date']]

    with open('data.json', 'w') as outfile:
        json.dump(album_info, outfile)

makeDefaultObj()



