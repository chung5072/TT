import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
    return (
        <div className='navbar'>
            <div className='nav-logobox'>
            <Link to="/">
                <img className="nav-logo" src="/dice.png" alt="dice" />
            </Link>
            </div>
            <div className='nav-menus'>
                <Link className="nav-menu" to="/notice">Notice </Link>
                <Link className="nav-menu" to="/meeting">Meeting </Link>
                <Link className="nav-menu" to="/share">Information</Link>
            </div>
        </div>
    )
}