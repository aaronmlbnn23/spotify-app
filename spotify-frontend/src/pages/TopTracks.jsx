import React, { useState, useEffect } from "react";
import { getTopTracks } from "../Spotify";
import { catchErrors, formatDuration } from "../utilities";
import { Link } from 'react-router-dom'
const TopTracks = () => {
  const [topTracks, setTopTracks] = useState();
  const [testdata, settestdata] = useState();
  const [limit, setLimit] = useState(20);
  useEffect(() => {
    const fetchTopTracks = async () => {
      const { data } = await getTopTracks(limit);
      settestdata(data);
      setTopTracks(
        data.items.map((track) => {
          const images = track.album.images.reduce((medium, image) => {
            if (image.height == 300) return image;
            return medium;
          }, track.album.images[0]);
          const duration = formatDuration(track.duration_ms);
          const artists = track.artists.map((artist) => artist.name).join(", ");
          const release_date = track.album.release_date.slice(0, 4);
          return {
            id: track.id,
            name: track.name,
            image: images,
            artists: artists,
            duration: duration,
            release_date: release_date,
            uri: track.uri
          };
        })
      );
    };
    fetchTopTracks();
  }, [limit]);
  //console.log(topTracks);
  console.log(testdata)
  return <div className="outlet">
      <h2 className="page-title">Top {limit} Tracks of All Time</h2>
      <div className="tracks-wrapper">
      {topTracks &&
          topTracks.map((track) => (
            <div className="tracks-items" key={track.id}>
              <Link className="items-wrapper" to={`/track/${track.id}`}>
                <img
                  className="track-image"
                  src={track.image.url}
                  alt="track-image"
                />
                <div className="tracks-info">
                  <p className="track-title">{track.name}</p>
                  <p className="track-artists">{track.artists} &bull; {track.release_date}</p>
                </div>
              </Link>
              <p className="track-duration">{track.duration}</p>
            </div>
          ))}
          </div>
          {limit == 20 ? <button className='seeButton' onClick={() => setLimit(50)}>See Top 50</button> :
          <button className='seeButton' onClick={()=> setLimit(20)}>See Less</button>
          }
          
  </div>;
};

export default TopTracks;
