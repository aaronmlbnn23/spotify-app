require('dotenv').config()
const express = require('express');
const app = express()
const axios = require('axios')
const path = require('path')
const querystring = require('querystring')
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;

const lyricsFinder = require('lyrics-finder');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(express.static(path.resolve(__dirname, '/spotify-frontend/dist')))


app.use(cors(corsOptions))


const generateRandomString = length => {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
}
//console.log(generateRandomString(15))
const stateKey = 'spotify_auth_state';

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state)
    const scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-follow-read user-read-recently-played playlist-read-private user-top-read'
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
})

app.get('/callback', (req, res) => {
    const code = req.query.code || null;
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        },
    })
        .then(response => {
            if (response.status === 200) {
                const { access_token, refresh_token, expires_in } = response.data;
                const queryParams = querystring.stringify({
                    access_token,
                    refresh_token,
                    expires_in
                })
                res.redirect(`${FRONTEND_URI}?${queryParams}`)

            } else {
                res.redirect(`/?${querystring.stringify({error: 'invalid token'})}`)
            }
        }).catch(error => {
            res.send(error)
        })

})


app.get('/refresh_token', (req, res) => {
    const {refresh_token} = response.data;
    console.log(refresh_token)
    axios({
        method: 'post',
        url: `https://accounts.spotify.com/api/refresh_token?refresh_token=${refresh_token}`,
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
        headers: {
            'content-type' : 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        }
    })
    .then(response => {
        res.send(response.data)
    }) .catch(error => {
        res.send(error)
    })
})

app.get('/lyrics', async (req, res)  => {
    const lyrics = await lyricsFinder(req.query.artist, req.query.track) || 'No Lyrics Found.'
    res.json({lyrics})
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/spotify-frontend/dist', 'index.html'));
})
app.listen(PORT, () => {
    console.log(`Express app is listening to http://localhost:${PORT}`)
})