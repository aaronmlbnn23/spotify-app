import React, { useState, useEffect } from 'react'
import { fetchSearchResults,  accessToken  } from '../Spotify';
import { catchErrors } from '../utilities'

import Player from './player'
const search = () => {
    const [search, setSearch] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [playTrack, setPlayTrack] = useState()
    
    const chooseTrack = (track) => {
        setPlayTrack(track)
        setSearch('')
    }
    
   

 
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
                            <div className='tracks' onClick={() => chooseTrack(track)}>
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
                < Player trackUri={playTrack?.uri}/>
        </>
    )
}

export default search