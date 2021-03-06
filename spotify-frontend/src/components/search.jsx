import React, { useState, useEffect } from "react";
import { fetchSearchResults, accessToken } from "../Spotify";
import { catchErrors } from "../utilities";
import { Link } from 'react-router-dom'
import Player from "./player";
const search = () => {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
 // const chooseTrack = (track) => {
   // setPlayTrack(track);
    //setSearch("");
 // };
 //console.log(searchResults)
  const handleClick = () => {
    setSearch('')
  }
  useEffect(() => {
    if (!search) return setSearchResults([]);
    let cancel = false;
    const fetchSearchData = async () => {
      const res = await fetchSearchResults(search);
      if (cancel) return;
      
      setSearchResults(
        res.data.tracks.items.map((track) => {
          const artists = track.artists.map((artist) => artist.name).join(", ");
         // console.log(artists)
          const smallestImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.album.images[0]);
          return {
            id: track.id,
            artist: artists,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestImage.url,
          };
        })
      );
    };
 
    catchErrors(fetchSearchData());
    return () => (cancel = true);
    
  }, [search]);

  return (
    
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search Song/Artist"
          className="searchInput"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-results-wrapper">
          {searchResults && searchResults.map((track) => (
            <div className="s-track-wrapper" key={track.uri}>
              <Link className="s-tracks"  to={`/track/${track.id}/${track.title}`} onClick={handleClick}>
                <img className="s-album-image" src={track.albumUrl} alt="Album" />

                <div className="s-artist-wrapper">
                  <h3 className="s-track-title"> {track.title} </h3>
                  <h5 className="s-artist-name">{track.artist} &nbsp;</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    
    
  );
};

export default search;
