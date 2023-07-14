import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import Input from './components/Input/Input';
import Results from './components/Results/Results';
import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AlbumDetails from './components/AlbumDetails/AlbumDetails';

export const Context = React.createContext();

const CLIENT_IT = "0fe9c010c07b460b8985d4a3f25ae485";
const CLIENT_SECRET = "87d45dc784e64cc6af9bd858a16458b4";

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {

    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_IT + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  // SEARCH-FUNKTION
  async function search() {
    console.log('Search for ' + searchInput);

    var searchParameters = {
      method: 'GET',
      headers: {
    /*     'Content_Type': 'application/json', */
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id })
    
    console.log(artistID);

    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAlbums(data.items);
      });
  }
  console.log(albums);

  return (
   
 /*    <div className='App'>
      <Context.Provider value={[searchInput, setSearchInput]}>
        <Header />
        <Input search={search} />
        <Results albums={albums} />
        <Footer />
      </Context.Provider>
      </div> */
    
      <div className="App">
      <BrowserRouter>
        <Context.Provider value={[searchInput, setSearchInput]}>
          <Header />
          <Input search={search} />

          <Routes>
            <Route path="/" element={<Results albums={albums} />} />
            <Route path="/albums/:id" element={<AlbumDetails albums={albums} />} />
          </Routes>
          <Footer />
        </Context.Provider>
      </BrowserRouter>
    </div>
    

  )
}

export default App
