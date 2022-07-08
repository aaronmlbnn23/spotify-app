import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import { accessToken } from "../Spotify"

const player = ({ trackUri }) => {
    
    const [play, setPlay] = useState(true)
    const [token, setToken] = useState()

    useEffect(() => setPlay(true), [trackUri])
    useEffect(() => {
        setToken(accessToken);
    }, [])
    
    if(!token) return null
    return (
        <SpotifyPlayer
            token={token}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
        />
    )
}

export default player