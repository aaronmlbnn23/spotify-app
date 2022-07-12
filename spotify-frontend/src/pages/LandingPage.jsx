import React from 'react'

const LandingPage = () => {
  const LOGIN_URI = process.env.NODE_ENV !== 'production' ? 'http://localhost:8888/login' :
  'http://intone-spotify.herokuapp.com/home';
  return (
    <div className='landing-page-wrapper'>
        <a
            className="login-link"
            href={LOGIN_URI}
            target="_blank"
            rel="noopener noreferrer"
          >
            Login to spotify
          </a>
    </div>
  )
}

export default LandingPage