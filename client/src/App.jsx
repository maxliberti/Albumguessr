import { useState, useEffect } from 'react'
import './styles.css'
import './App.css'
import axios from 'axios'
import spotifyLogo from './assets/Spotify_Primary_Logo_RGB_Green.png'

const ENDPOINT_URL = 'http://localhost:8080/api';

function App() {
    const [albums, setAlbumObject] = useState([]);

    const fetchAPI = async () => {
        const response = await axios.get(ENDPOINT_URL);
        console.log(response.data.albums);
        setAlbumObject(response.data.albums);
    }

   // console.log(albums);

    useEffect(() => {
        fetchAPI();
    }, [])

    return (
        <div className="App">
            <img src={spotifyLogo} className="spotify-logo" alt="Spotify"/>
            <h1>Albumguessr</h1>
            {(Object.keys(albums).map(key => (
                <div key={key}>
                    <img src={albums[key].images[1]}/>
                    <p>{albums[key].name}</p>
                    <p>by {albums[key].artists[0]}</p>
                    <p>released on {albums[key].release}</p>
                </div>
            )))}
        </div>
    )
}

export default App
