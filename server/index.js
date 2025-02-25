const getUserAlbums = require('./utils.js')
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get("/api", async (req, res) => {
    try {
        let albums = await getUserAlbums()
        //let albums = {albums : ["tpab", "scorpion"]}
        res.json(albums);
    } catch (err) {
        console.log(err);
    }
});

app.listen(8080, () => {
    console.log("Listening on 8080");
});