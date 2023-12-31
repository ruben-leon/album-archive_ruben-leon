import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import Input from './components/Input/Input';
import Results from './components/Results/Results';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AlbumDetails from './components/AlbumDetails/AlbumDetails';
import './App.css'

export const Context = React.createContext();

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {

    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  // SEARCH-FUNKTION
  async function search() {
    console.log('Search for ' + searchInput);

    const searchParameters = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id })
    
    console.log(artistID);

      const returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAlbums(data.items);
        const albumIDs = data.items.map(item => item.id);
        
        // Fetch tracks for each album
        const tracksPromises = albumIDs.map(albumID =>
          fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks`, searchParameters)
            .then(response => response.json())
            .then(data => data.items.map(item => item.name))
        );

        Promise.all(tracksPromises)
          .then(allTracks => {
            const tracksByAlbum = albumIDs.reduce((result, albumID, index) => {
              result[albumID] = allTracks[index];
              return result;
            }, {});
            setTracks(tracksByAlbum);
          })
          .catch(error => {
            console.error('Error fetching tracks:', error);
          });
      });   
  }


  return (
   
    <div className="App">
      <HashRouter>
        <Context.Provider value={[searchInput, setSearchInput]}>
          <Header/>
          <Input search={search} />
          <Routes>
            <Route path="*" element={<Results albums={albums} />} />
            <Route path="/albums/:id" element={<AlbumDetails albums={albums} tracks={tracks} />} />
          </Routes>
          <Footer />
        </Context.Provider>
      </HashRouter>
    </div>
  
  )
}
  

export default App
