import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AlbumDetails.css'

function AlbumDetails({ albums, tracks }) {
  const { id } = useParams();
  const album = albums[parseInt(id)];
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

    const albumTracks = tracks[album.id] || [];
    
    const [showTracks, setShowTracks] = useState(true);

  return (
    <div className='details'>
      <div className='flex-container' style={{ display: 'flex', justifyContent: 'center', marginTop: '3em'}}>
        <div className='infos' style={{width: '50%', paddingLeft: '4em', paddingRight: '3em' }}>
            <h1>{album.name}</h1>
            <h3>{album.artists[0].name}</h3>
            <h5 style={{marginTop: '1em'}}>Released: {album.release_date.slice(0, 4)}</h5>
            <h5 style={{marginBottom: '1em'}}>Total Tracks: {album.total_tracks}</h5>
            
            <i><p className='show-tracks' style={{ cursor: 'pointer', display: 'inline' }} onClick={() => setShowTracks(!showTracks)}>
                      {
                          showTracks ?
                              'Show Album Tracks'
                              :
                              'Hide Album Tracks'
                      }
            </p></i>
            <div className='tracks' style={ showTracks ? {display: 'none'} : {display: 'block'}}>
            
              {albumTracks.map((track, index) => (
                <ul>
                <li key={index}>{track}</li>
                </ul>
              ))}
            
            </div>
            <Container style={{ padding: '0px' }}>
            <a href={album.external_urls.spotify} target='_blank'>
              <Button size='lg' style={{marginTop: '2em' }}>Listen On Spotify</Button>
            </a>
            </Container>
        </div>
        <img className='cover-image' src={album.images[0].url} alt="Album Cover" style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginRight: '2em', width: '620px', height: '620px'}} />
      </div>
    </div>
  );
}

export default AlbumDetails;
