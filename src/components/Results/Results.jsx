import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, useParams } from 'react-router-dom';
import './Results.css'
import AlbumDetails from '../AlbumDetails/AlbumDetails';

function Results({ albums }) {
    
  return (
   
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <Row className="mx-2 row row-cols-4">
                {albums.map((album, i) => (
                  <Card
                    key={i}
                    style={{ paddingTop: '0.5em', marginBottom: '0.5em', fontFamily: 'Montserrat, sans-serif', border: '0px'}}
                  >
                    <Link className='card-link' to={`/albums/${i}`} style={{textDecoration: 'none', color: 'inherit'}}>
                      <Card.Img src={album.images[0].url} />
                      <Card.Body>
                        <Card.Title
                          style={{ textAlign: 'center', fontSize: '0.9em' }}
                        >
                          {album.name}
                        </Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                ))}
              </Row>
            }
          />
          <Route
            path="/albums/:id"
            element={<AlbumDetails albums={albums} />}
          />
        </Routes>
      </Container>
    
  );
}

export default Results;

