import React, { useEffect, useState } from "react";
import { getPlaylists } from "../Spotify";
import { catchErrors } from "../utilities";
import { BsEyeFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const Playlists = () => {
  const [playLists, setPlayLists] = useState();
  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await getPlaylists();
      setPlayLists(
        res.data.items.map((data) => {
          const images = data.images.reduce((medium, image) => {
            if (image.height == 300) return image;
            return medium;
          }, data.images[0]);
          return {
            id: data.id,
            name: data.name,
            length: data.tracks.total,
            image: images,
            uri: data.uri,
          };
        })
      );
    };
    catchError(fetchPlaylists());
  }, []);
  
  return (
    <div className="playlists-wrapper outlet">
      <h2 className="page-title">Playlists</h2>
      <div className="playlist-wrapper">
        {playLists ?
          (playLists.map((playlist) => (
            <div className="playlist-items" key={playlist.uri}>
              <div className="image-wrapper">
              <img
                className="playlist-image"
                src={playlist.image.url}
                alt="playlist-avatar"
              />
               <div className="view-wrapper">
                <Link to={`/playlist/${playlist.id}`} ><BsEyeFill className="view-icon" /></Link>
                
              </div>
              </div>
              <div className="playlist-info">
                <h3 className="playlist-title">{playlist.name}</h3>
                <h5 className="number-of-tracks">{playlist.length} Tracks</h5>
              </div>
             
            </div>
          ))) : <Loader/>}
      </div>
    </div>
  );
};

export default Playlists;
