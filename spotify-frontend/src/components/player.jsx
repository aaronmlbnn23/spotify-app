import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import { accessToken } from "../Spotify"

const Player = ({ trackUri }) => {
    
    const [play, setPlay] = useState(true)
    const [token, setToken] = useState()

    useEffect(() => setPlay(true), [trackUri])
    useEffect(() => {
        setToken(accessToken);
    }, [])
    
    if(!token) return null
    return (
        
        <SpotifyPlayer
            className="player"
            token={token}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}

            styles={{activeColor: '#1db954',
            bgColor: '#1c1c1c',
            color: '#ffffff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
        }}
        />
       
    )
}

export default Player