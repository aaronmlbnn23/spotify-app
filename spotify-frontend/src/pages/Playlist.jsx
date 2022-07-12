import React, { useEffect, useState } from "react";
import { getPlaylist } from "../Spotify";
import { catchErrors, formatDuration } from "../utilities";
import { useParams, Link } from "react-router-dom";
const Playlist = () => {
  const [playlist, setPlaylist] = useState();
  const { id } = useParams();
  const [playlistTracks, setPlaylistTracks] = useState();

  useEffect(() => {
    if (!id) return;
    const fetchPlaylist = async () => {
      const { data } = await getPlaylist(id);
      setPlaylist(data);
      setPlaylistTracks(
        data.tracks.items.map((track) => {
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
            
          };
        })
      );
    };
    catchErrors(fetchPlaylist());
  }, [id]);
  //console.log(testdata);
  //console.log(testdata);
  return (
    <div className="outlet">
      {playlist && (
        <div className="playlist-header">
          <img
            className="playlist-image"
            src={playlist.images[0].url}
            alt="playlist-avatar"
          />
          <div className="playlist-info">
            <p className="playlist-name">{playlist.name}</p>
            <p className="playlist-owner">By {playlist.owner.display_name}</p>
            <p className="playlist-length">{playlist.tracks.total} Tracks</p>
            <a
              className="playSpotify"
              target="_blank"
              rel="noopener noreferrer"
              href={playlist.external_urls.spotify}
            >
              Play on spotify
            </a>
          </div>
        </div>
      )}
      <div className="playlist-tracks-wrapper">
        {playlistTracks &&
          playlistTracks.map((track) => (
            <div className="playlist-tracks-items" key={track.id}>
              <Link className="items-wrapper" to={`/track/${track.id}/${track.title}`}>
                <img
                  className="track-image"
                  src={track.image.url}
                  alt="track-image"
                />
                <div className="tracks-info">
                  <p className="track-title">{track.title}</p>
                  <p className="track-artists">{track.artists}</p>
                </div>
              </Link>
              <p className="track-duration">{track.duration}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Playlist;
