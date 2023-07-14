/* import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap'; 
import { useContext } from 'react';
import { Context } from '../../App';

function Input({ search }) {

    const [searchInput, setSearchInput] = useContext(Context);

    return (
    <>
        <Container style={{marginTop: '2em', marginBottom: '1.5em'}}>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search For Artist'
            type='input'
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
    </>
    )
}

export default Input; */

import React, { useContext } from 'react';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Context } from '../../App';
import { useLocation } from 'react-router-dom';
import './Input.css'

function Input({ search }) {
  const [searchInput, setSearchInput] = useContext(Context);
  const location = useLocation();

  // Check if the current route is "/albums/:id"
  const isAlbumDetailsRoute = location.pathname.includes('/albums/');

  return (
    <>
      {!isAlbumDetailsRoute && (
        <Container style={{ marginTop: '2em', marginBottom: '1.5em' }}>
          <InputGroup className="mb-3" size="lg">
            <FormControl
              placeholder="Search For Artist"
              type="input"
                onChange={(event) => setSearchInput(event.target.value)}
                onKeyDown={(event) => {
                if (event.key === 'Enter') {
                search();
                }
                }}
            />
            <Button className='button' onClick={search}>Search</Button>
          </InputGroup>
        </Container>
      )}
    </>
  );
}

export default Input;
