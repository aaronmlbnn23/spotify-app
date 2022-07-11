import Search from "../components/Search";
import { getRecentlyPlayed } from "../Spotify";
import { useState, useEffect } from "react";
import { catchErrors, formatDuration } from "../utilities";
import { Link } from 'react-router-dom'
const RecentPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [testdata, settestdata] = useState();
  const [limit, setLimit ] = useState(8)
  //console.log(recentlyPlayed)
  useEffect(() => {
    const fetchRecent = async () => {
      const res = await getRecentlyPlayed(limit);
      settestdata(res.data.items);
      setRecentlyPlayed(
        res.data.items.map((data) => {
          const artists = data.track.artists
            .map((artist) => artist.name)
            .join(", ");
         const duration = formatDuration(data.track.duration_ms);
          const image = data.track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, data.track.album.images[0]);
          return {
            id: data.track.id,
            played_at: data.played_at,
            duration: duration,
            artist: artists,
            title: data.track.name,
            uri: data.track.uri,
            albumUrl: image.url,
          };
        })
      );
    };
    catchErrors(fetchRecent());
  }, [limit]);

 //console.log(testdata);
  const seeLess = () => {
    setLimit(8);
  }

  const seeAll = () => {
    setLimit(0);
  }
  return (
    <div className="recentplayed-wrapper">
      
      <div className="history-wrapper">
        <h2 className="page-title">Recently Played</h2>
        <div className="recently-wrapper">
          {recentlyPlayed &&
            recentlyPlayed.map((track) => (
              <div className="recent-container" key={track.played_at}>
                <Link className="recent-info" to={`/track/${track.id}`}>
                  <img
                    className="album-image"
                    src={track.albumUrl}
                    alt="Album"
                  />
                  <div className="recent-artist-wrapper">
                    <h3 className="recent-title"> {track.title} </h3>
                    <h5 className="recent-name">{track.artist} &nbsp;</h5>
                  </div>
                </Link>
                <h5 className="duration">{track.duration}</h5>
              </div>
            ))}
            {limit == 8 ?  <button className="seeMoreButton" onClick={seeAll}>See all</button> :
            
            <button className="seeMoreButton" onClick={seeLess}>See less</button>
            }

           
        </div>
      </div>
    </div>
  );
};

export default RecentPlayed;
