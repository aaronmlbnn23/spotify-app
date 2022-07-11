import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrack } from "../Spotify";

const Track = () => {
  const [track, setTrack] = useState();
  const [testdata, settestdata] = useState();
  const { id } = useParams();

  console.log(testdata);
  useEffect(() => {
    const fetchTrack = async () => {
      const { data } = await getTrack(id);
      setTrack(data);
      settestdata(data);
    };
    fetchTrack();
  }, [id]);
  return (
    <div className="outlet">
      <div className="track-wrapper">
        {track && 
        <div className="track-header">
            <img src={track.album.images[0].url} alt='track-image' className="track-image"/>
            <div className="track-info">
            <p className="track-title">{track.name}</p>
            <p className="track-artist">{track.artists.map((artist) => artist.name).join(', ')}</p>
            <p className="track-album">{ track.album.name} &bull; {track.album.release_date.slice(0, 4)}</p>
            <a href={track.external_urls.spotify} target='_blank' className="play">Play on Spotify</a>
            </div>
          </div>
          }
      </div>
    </div>
  );
};

export default Track;
