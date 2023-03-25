import './App.css';
import SearchBar from './components/SearchBar';
import Gallery from'./components/Gallery';
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for music!')
  let [data, setData] = useState([])
  
  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
      if(search) {
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(API_URL + search)
        const resData = await response.json()
        if(resData.results.length > 0){
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData() //run the function
    }
  }, [search]) //dependency array reminding our 'useEffect' to only re-fire if the value of search is updated.

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div>
      {message}
        <Router>
          <Routes>
            <Route path="/" element={
              <>
              <SearchBar handleSearch = {handleSearch}/>
              <Gallery data={data} />
              </>
          } />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/artist/:id" element={<ArtistView />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
