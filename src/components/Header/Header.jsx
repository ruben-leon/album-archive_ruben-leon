import './Header.css'

function Header({ onClick }) {

    return (
        <>
            <div className='header'>
                <a className='anchor' href="/spa-final-project_ruben-leon/">
                    <div className='header-name' onClick={onClick}>
                        ALBUM ARCHIVE
                    </div>
                    <p className='p'>POWERED BY SPOTIFY</p>
                </a>
            </div>
        </>
    )
}

export default Header;