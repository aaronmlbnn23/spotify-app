import { useState, useEffect } from 'react'
import { accessToken, logout, getCurrentUserProfile } from './Spotify'
import { catchErrors } from './utilities'
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import { Profile, TopArtists, TopTracks, LandingPage, Playlists, SpecificPlaylist, Search, Layout, Home} from './pages'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(accessToken)

  }, [])
  
  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <div className="App">
      {!token ?
        <LandingPage />
        :
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Layout/>}  > 
            <Route path='/top-tracks' element={<TopTracks />} />
            <Route path='/top-artists' element={<TopArtists />} />
            <Route path='/playlists/:id' element={<SpecificPlaylist />} />
            <Route path='/playlists' element={<Playlists />} />
            <Route path='/search' element={<Search />} />
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Home/>}></Route>
            </Route>
           
          </Routes>
        </BrowserRouter>


      }



    </div>
  )
}

export default App
