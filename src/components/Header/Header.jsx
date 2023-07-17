import './Header.css'

function Header({ onClick }) {

    return (
        <>
            <a className='anchor' href="/spa-final-project_ruben-leon/">
            <div className='header' onClick={onClick}>
                ALBUM ARCHIVE
            </div>
                <p className='p'>POWERED BY SPOTIFY</p>
            </a>
        </>
    )
}

export default Header;