import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrack } from "../Spotify";
import { Link } from "react-router-dom";
import Player from "../components/player";
import { getCurrentUserProfile } from "../Spotify";
import { catchErrors } from "../utilities";
import axios from "axios";
import Loader from '../components/Loader'

const Track = () => {
  const [track, setTrack] = useState();
  const { id } = useParams();
  const [trackUri, setTrackUri] = useState();
  const [product, setProduct] = useState();
  const [lyrics, setLyrics] = useState();
  const [currentTrackArtist, setCurrentTrackArtist] = useState();
  const { title } = useParams();
 // console.log(track)
  useEffect(() => {
    if(!title) return;
    axios
      .get("http://localhost:8888/lyrics", {
        params: {
          track: title,
          artitst: currentTrackArtist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [title]);


  

  const playTrack = (track) => {
    setTrackUri(track.uri);
    setCurrentTrackArtist(track.artists[0].name);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getCurrentUserProfile();
      setProduct(data);
    };
    catchErrors(fetchProduct());
  }, []);
  //console.log(product);

  useEffect(() => {
    const fetchTrack = async () => {
      const { data } = await getTrack(id);
      setTrack(data);
    };
    fetchTrack();
  }, [id]);
  //console.log(track);
  return (
    <div className="track-outlet outlet">
      <div className="track-wrapper">
        {track && lyrics ? (
          <div className="track-header">
            <img
              src={track.album.images[0].url}
              alt="track-image"
              className="track-image"
            />
            <div className="track-info">
              <p className="track-title">{track.name}</p>
              <p className="track-artist">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p className="track-album">
                {track.album.name} &bull; {track.album.release_date.slice(0, 4)}
              </p>

              {product && product.product == "premium" ? (
                <a
                  type="button"
                  className="play"
                  onClick={() => playTrack(track)}
                >
                  Play with lyrics
                </a>
              ) : (
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  className="play"
                >
                  Play on Spotify
                </a>
              )}
            </div>
          </div>
        ) : <Loader/>}
      </div>

      <div className="lyrics">
        {lyrics && (<pre>{lyrics}</pre>) }
      </div>
      <div className="player-wrapper">
        <Player trackUri={trackUri} />
      </div>
    </div>
  );
};

export default Track;
