import { getSavedTracks } from "../Spotify"
import { useState, useEffect } from 'react'
import { catchErrors, formatDuration } from '../utilities'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
const Home = () => {
  const [savedTracks, setSavedTracks] = useState()

  useEffect(() => {
    const fetchSavedTracks = async () => {
      const { data } = await getSavedTracks()
      setSavedTracks(
        data.items.map((track) => {
          const release_date = track.track.album.release_date.slice(0, 4);
          const duration = formatDuration(track.track.duration_ms);
          const artists = track.track.artists
            .map((artist) => artist.name)
            .join(", ");
          const images = track.track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.track.album.images[0]);


          return {
            image: images,
            title: track.track.name,
            artists: artists,
            duration: duration,
            id: track.track.id,
            release_date: release_date,
            uri: track.uri
          };
        }))

    }
    catchErrors(fetchSavedTracks());
  }, [])
  //    console.log(testdata)
  return (
    <div className='home-wrapper outlet'>
      <h2 className="page-title">Saved Tracks</h2>

      <div className="tracks-wrapper">
        {(function () {
          switch (savedTracks && savedTracks.length) {
            case 0:
              return (<div className="nothing-wrapper">
                <h1 className="nosave">No saved Tracks.</h1>
              </div> )
              
            default:
              return( savedTracks ? (savedTracks.map((track) => (
                <div className="tracks-items" key={track.id}>
                  <Link className="items-wrapper" to={`/track/${track.id}/${track.title}`}>
                    <img
                      className="track-image"
                      src={track.image.url}
                      alt="track-image"
                    />
                    <div className="tracks-info">
                      <p className="track-title">{track.title}</p>
                      <p className="track-artists">{track.artists} &bull; {track.release_date}</p>
                    </div>
                  </Link>
                  <p className="track-duration">{track.duration}</p>

                </div>
              ))): <Loader/>)
              
              
          }
        })()}

      </div>
    </div>
  )
}

export default Home