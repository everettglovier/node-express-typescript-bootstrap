import {Movie} from "./classes/Movie";
import {Database} from "./classes/Database";
import {User} from "./classes/User";

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/movies', async (req, res) => {
    const hash =  User.hashPassword('p104520q' );
    const pw = 'p104520q';
    res.send( User.verifyPassword( pw, hash ) );
    //const data = await Movie.searchForMovie('snow dogs');
    //console.log( data[0]);
    //Database.updateConfig({});
    //res.send('WOO!');
});

app.get('/add-user', async (req, res) => {
    try {
        const user = await User.addUser({username: 'everettglovier', name: 'Everett Glovier', password: 'p104520q'});
        res.send(user);
        const token = await User.login('everettglovier', 'p104520q');
        res.send({ token });
    } catch( error ) {
        res.send( { error: true, message: error.message } );
    }
});

app.get('/login', async (req, res) => {
    try {
        res.send(await User.login('everettglovier', 'p104520q') );
    } catch( error ) {
        res.send( { error: true, message: error.message } );
    }
});

app.get('/user/:token', async (req, res) => {
    try {
        res.send(await User.verifyToken(req.params.token));
    } catch( e ) {
        res.send( e );
    }
});

app.get('/generate', async (req, res) => {
    res.send( require('crypto').randomBytes(64).toString('hex') );
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
