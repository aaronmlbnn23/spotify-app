import React from 'react'
import { useEffect, useState } from 'react'
import { logout, getCurrentUserProfile } from '../Spotify'
import { catchErrors } from '../utilities'

const Profile = () => {
  const [profile, setProfile] = useState();
  useEffect(() => {

    const fetchProfileData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data)
    }
    fetchProfileData();
  }, [])


  return (
    <div>
      {profile &&
        <>  {
          profile.images.length && profile.images[0].url && (<img className='profile-avatar' src={profile.images[0].url} alt="avatar" />)
        }
          <h2>{profile.display_name}</h2></>


      }
    
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Profile