import React, {useState, useEffect} from 'react'
import { getArtist } from '../Spotify'
import { useParams } from 'react-router-dom'
import { catchErrors, separateComma } from '../utilities'
import Loader from '../components/Loader'
const TopArtist = () => {
  const [artist, setArtist ] = useState()
  const {id } = useParams();
  useEffect(() => {
    const fetArtist = async () => {
      const {data} = await getArtist(id)
      setArtist(data)
    }
    catchErrors(fetArtist())
  }, [])
  return (
    <div className='outlet'>

      <div className='artist-wrapper '>
        {artist ? (<>
        <div className='artist-image-wrapper'> 
            <img className='artist-image' src={artist.images[0].url} alt='artist-image' />
          </div>
          <div className='artist-info'>
            <p className='artist-name'>{artist.name}</p>
            <p className='artist-followers'>Followers: <span className='number-followers'> {separateComma(artist.followers.total)} </span></p>
            <p className='artist-genre'>Genres: {artist.genres.map((genre) => genre).join(', ')}</p>
            <a href={artist.external_urls.spotify} target='_blank' className='view'>View on Spotify</a>
          </div>
          </>) : <Loader/>
        }
      </div>
    </div>
  )
}

export default TopArtist