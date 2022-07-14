import React from 'react'
import { useEffect, useState } from 'react'
import { logout, getCurrentUserProfile, getFollowedArtists, accessToken, getPlaylists } from '../Spotify'
import { catchErrors } from '../utilities'
import { Link, useLocation } from 'react-router-dom' 
import { TbPlaylist, TbHome2, TbMicrophone2} from 'react-icons/tb'
import {IoMusicalNotesOutline} from 'react-icons/io5'
import  IntoneLogo  from '../images/intone-logo.png'

const Sidebar = () => {
  const [profile, setProfile] = useState();
  const [followedArtists, setFollowedArtists] = useState()
  const [playlists, setPlaylists] = useState();
  const location = useLocation()
  const splitLocation = location.pathname.split('/')
  useEffect(() => {
    
    const fetchProfileData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data)
    }
    catchErrors(fetchProfileData());
  }, [])

  useEffect(() => {
    const fetchPlaylist = async () => {
      const { data } = await getPlaylists();
      setPlaylists(data)
    }
    catchErrors(fetchPlaylist())
  }, [])

  useEffect(()=> {
      const fetchFollowedArtists = async () => {
        const {data } = await getFollowedArtists();
        setFollowedArtists(data.artists)
      }
      catchErrors(fetchFollowedArtists());
  }, [])
 // console.log(profile)
 
  return (
    
      <div className='sidebar-wrapper'>
        <div className='logo-wrapper '>
            <img className='intone-logo' src={IntoneLogo} alt='logo'/>
        </div>
          <div className='user-wrapper'>
          {profile &&


            <>  {
              profile.images.length && profile.images[0].url && (<img className='avatar' src={profile.images[0].url} alt="avatar" />)
            }
              <h2 className='username'>{profile.display_name}</h2>

                <div className='stats-wrapper'>
                    <div className='followers'>
                        <b className='stats-number'>{profile.followers.total}</b>
                        <p className='stats-label'>Followers</p>
                    </div>
                    <div className='following'>
                      {followedArtists && <b className='stats-number'>{followedArtists.items.length }</b>}
                    
                        
                        <p className='stats-label'>Following</p>
                    </div>
                    <div className='playlists'>
                      {playlists &&  <b className='stats-number'>{playlists.total}</b>}
                       
                        <p className='stats-label'>Playlists</p>
                    </div>
                </div>
            </>
          }
          </div>

          <div className='menu-wrapper'>
            <Link to='/home' className='menu-item'>
            <TbHome2 className={splitLocation[1] === 'home'? 'active': ''} />
              Home
            </Link>
            <Link to='/top-tracks' className='menu-item'>
              <IoMusicalNotesOutline className={splitLocation[1] === 'top-tracks'? 'active': ''}/>
              Top Tracks
            </Link>
            <Link to='/top-artists' className='menu-item'>
              <TbMicrophone2 className={splitLocation[1] === 'top-artists'? 'active': ''}/>
              Top Artists
            </Link>
            <Link to='/playlists' className='menu-item'>
              < TbPlaylist className={splitLocation[1] === 'playlists'? 'active': ''}/>
              Playlists
            </Link>
          </div>
          <button className='logoutButton' onClick={() => logout()}>LOGOUT</button>
      </div>


    
  )
}

export default Sidebar