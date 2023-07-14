import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, useParams } from 'react-router-dom';
import './AlbumDetails.css'


function AlbumDetails({ albums }) {
  const { id } = useParams();
  const album = albums[parseInt(id)];

  return (
    <div className='details'>
        
        <div className='flex-container' style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5em'}}>
            <div className='infos' style={{width: '50%', paddingLeft: '4em', paddingRight: '3em' }}>
                <h1>{album.name}</h1>
                <h3>{album.artists[0].name}</h3>
                <h5 style={{marginTop: '1em'}}>Released: {album.release_date.slice(0, 4)}</h5>
                <h5>Total Tracks: {album.total_tracks}</h5>
                  <Container style={{ padding: '0px' }}>
                      <a href={album.external_urls.spotify} target='_blank'>
                          <Button size='lg' style={{marginTop: '1em' }}>Listen On Spotify</Button>
                          </a>
                  </Container>
            </div>
            <img className='cover-image' src={album.images[0].url} alt="Album Cover" style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginRight: '2em'}} />
        </div>

    </div>
  );
}

export default AlbumDetails;