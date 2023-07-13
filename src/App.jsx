import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap'; 
import { useState, useEffect } from 'react';
import './App.css'

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
    <div className='App'>
      <Container style={{marginTop: '2em'}}>
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
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {albums.map((album, i) => {
            return (
              <Card style={{paddingTop: '0.5em', marginBottom: '0.5em'}}>
                <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title style={{ textAlign: 'center', fontSize: '0.8em'}}>
                    {album.name}
                    </Card.Title>
                  </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>

      {/* <Container>
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
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className='mx-2 row-cols-4'>
          {albums.map((album, i) => (
            <Col key={i}>
              <Card style={{ display: 'flex', alignItems: 'center', paddingTop: '0.5em' }}>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center', fontSize: '0.8em' }}>
                    {album.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container> */}

{/* <Container>
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
      <Container>
        <Row className='mx-2 row-cols-4'>
          {albums.map((album, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={3}>
              <Card style={{paddingTop: '0.5em', paddingLeft: '0.5em', paddingRight: '0.5em', marginBottom: '0.5em', backgroundColor: '#797ffb90'}}>
                <Card.Img src={album.images[0].url} />
                <Card.Body style={{backgroundColor: '#00000000'}}>
                  <Card.Title style={{ textAlign: 'center', fontSize: '0.8em', backgroundColor: '#00000000'}}>
                    {album.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container> */}
    </div>

  )
}

export default App
