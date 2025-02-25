import { useState, useEffect } from 'react'
import List from './Albums.jsx'
import './App.css'
import axios from 'axios'

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
;

    return (
        <div className="App">
            <h1>Albumguessr</h1>
            {(Object.keys(albums).map(key => (
                <div key={key}>
                    <p>{albums[key].name}</p>
                </div>
            )))}
        </div>
    )
}

export default App
