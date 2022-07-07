import React, { useState, useEffect } from 'react'
import { fetchSearchResults } from '../Spotify';
import { catchErrors } from '../utilities'
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { accessToken } from '../Spotify';
const search = () => {
    const [search, setSearch] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [playTrack, setPlayTrack] = useState()
    const [token, setToken] = useState()
    console.log(searchResults)

  
    useEffect(() => {
        setToken(accessToken)
      }, [])


    useEffect(() => {
        if (!search) return setSearchResults([])
        let cancel = false
        const fetchSearchData = async () => {
            const res = await fetchSearchResults(search);
            if (cancel) return
            setSearchResults(
                res.data.tracks.items.map((track) => {
                    const smallestImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestImage.url
                    }
                })
            )

        }
        catchErrors(fetchSearchData())
        return () => (cancel = true)
    }, [search])


    return (
        <>
            <div className='search-wrapper'>
                <input type="text" placeholder='Search Song/Artist' className='searchInput' onChange={(e) => setSearch(e.target.value)} />
                {
                    searchResults.map((track) => (
                        <div className="track-wrapper" key={track.uri}>
                            <div className='tracks' onClick={() => setPlayTrack(track.uri)}>
                                <img className="album-image" src={track.albumUrl} alt='Album' />

                                <div className='artist-wrapper'>
                                    <h3 className='track-title'> {track.title} </h3>
                                    <h5 className='artist-name'>{track.artist} &nbsp;</h5>
                                </div>


                            </div>
                        </div>
                    ))
                }
            </div>
                < SpotifyWebPlayer showSaveIcon
                token={token}
                uri={playTrack}
                />
        </>
    )
}

export default search