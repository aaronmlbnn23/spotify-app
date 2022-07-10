import React from 'react'
import { useEffect, useState } from 'react'
import { logout, getCurrentUserProfile, getFollowedArtists, accessToken, getPlaylists } from '../Spotify'
import { catchErrors } from '../utilities'
import { Link } from 'react-router-dom' 
import { TbPlaylist, TbHome2, TbMicrophone2} from 'react-icons/tb'
import {IoMusicalNotesOutline} from 'react-icons/io5'

const Sidebar = () => {
  const [profile, setProfile] = useState();
  const [followedArtists, setFollowedArtists] = useState()
  const [followers, setFollowers] = useState(0);
  const [playlists, setPlaylists] = useState();
  
  useEffect(() => {
    
    const fetchProfileData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data)
    }
    fetchProfileData();
  }, [])

  useEffect(() => {
    const fetchPlaylist = async () => {
      const { data } = await getPlaylists();
      setPlaylists(data)
    }
    fetchPlaylist()
  }, [])

  useEffect(()=> {
      const fetchFollowedArtists = async () => {
        const {data } = await getFollowedArtists();
        setFollowedArtists(data.artists)
      }
      fetchFollowedArtists();
  }, [])
 
 
  return (
    
      <aside className='sidebar-wrapper'>
          <div className='user-wrapper'>
          {profile &&


            <>  {
              profile.images.length && profile.images[0].url && (<img className='avatar' src={profile.images[0].url} alt="avatar" />)
            }
              <h2 className='username'>{profile.display_name}</h2>

                <div className='stats-wrapper'>
                    <div className='followers'>
                        <b className='stats-number'>{profile.followers.total}</b>
                        <p className='stats-label'>FOLLOWERS</p>
                    </div>
                    <div className='following'>
                      {followedArtists && <b className='stats-number'>{followedArtists.items.length }</b>}
                    
                        
                        <p className='stats-label'>FOLLOWING</p>
                    </div>
                    <div className='playlists'>
                      {playlists &&  <b className='stats-number'>{playlists.total}</b>}
                       
                        <p className='stats-label'>PLAYLISTS</p>
                    </div>
                </div>
            </>
          }
          </div>

          <div className='menu-wrapper'>
            <Link to='/home' className='menu-item'>
            <TbHome2/>
              Home
            </Link>
            <Link to='/top-tracks' className='menu-item'>
              <IoMusicalNotesOutline/>
              Top Tracks
            </Link>
            <Link to='/top-artists' className='menu-item'>
              <TbMicrophone2/>
              Top Artists
            </Link>
            <Link to='/playlists' className='menu-item'>
              < TbPlaylist/>
              Playlists
            </Link>
          </div>
          <button className='logoutButton' onClick={() => logout()}>LOGOUT</button>
      </aside>


    
  )
}

export default Sidebar