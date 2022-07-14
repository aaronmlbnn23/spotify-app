import React, { useState, useEffect } from "react";
import { getTopArtists } from "../Spotify";
import { catchErrors } from "../utilities";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import Loader from "../components/Loader";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState();
  const [limit, setLimit] = useState(10);
  //console.log(topArtists);
  useEffect(() => {
    const fetchTopArtists = async () => {
      const { data } = await getTopArtists(limit);
      setTopArtists(
        data.items.map((artist) => {
          const images = artist.images.reduce((largest, image) => {
            if (image.height > largest.height) return image;
            return largest;
          }, artist.images[0]);
          return {
            id: artist.id,
            name: artist.name,
            image: images,
          };
        })
      );
    };
    catchErrors(fetchTopArtists());
  }, [limit]);

  return (
    <div className="top-wrapper outlet">
      <h2 className="page-title">Top {limit} Artists of All Time</h2>
      <div className="top-artists-wrapper">

        {(function () {
          switch (topArtists && topArtists.length) {
            case 0:
              return (<div className="nothing-wrapper">
                <h1 className="nosave">No top artist.</h1>
              </div>)
            default:
              return (topArtists ? (topArtists.map((artist) => (
                <div className="top-artist-items" key={artist.id}>
                  <div className="image-wrapper">
                    <img
                      className="top-artist-image"
                      src={artist.image.url}
                      alt="artist avatar"
                    />
                    <div className="view-wrapper">
                      <Link to={`/top-artist/${artist.id}`}>
                        <BsEyeFill className="view-icon" />
                      </Link>
                    </div>
                  </div>
                  <p className="top-artist-name">{artist.name}</p>
                </div>
              ))) : <Loader />)
          }

        })()}
      </div>

      {limit == 10 ? (
        <button onClick={() => setLimit(50)} disabled={topArtists && topArtists.length <= 10} className="seeAll">
          See Top 50
        </button>
      ) : (
        <button onClick={() => setLimit(10)} className="seeAll">
          See Less
        </button>
      )}
    </div>
  );
};

export default TopArtists;
