import './Footer.css'

function Footer() {

    return (
        <>
            <div className='footer'>
                {/* <p>&copy; 2023 by Album Archive</p> */}
                <img className='spotify-img' style={{ width: '12em', marginBottom: '1.5em'}} src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="spotify logo" />
                <p className='data-provided'>All data provided by Spotify</p>
            </div>
        </>
    )
}

export default Footer;