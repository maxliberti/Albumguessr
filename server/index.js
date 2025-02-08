const getUserAlbums = require('./utils.js')
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

//getUserAlbums().then((data) => {console.log(data)});

app.get("/api", async (req, res) => {
    try {
        let albums = await getUserAlbums()
        console.log("i got here");
        res.json(JSON.stringify(albums));
        console.log("i got here too");
    } catch (err) {
        console.log(err);
    }
});

/*
async function test () {
    let albums = await getUserAlbums()
    console.log(albums)
    albums_formatted = JSON.parse(albums)
    console.log(albums_formatted)
}


});

test()
*/



app.listen(8080, () => {
    console.log("Listening on 8080");
});