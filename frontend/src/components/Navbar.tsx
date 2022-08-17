import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useAppDispatch } from '../app/hooks';
import { removeToken } from '../features/user/loginSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
export default function Navbar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state:RootState) => state.login.currentUser)
    const logoutRequest: any = () => {
        dispatch(removeToken())
        navigate('/')
      }
    return (
        <div className='navbar'>
            <div className='nav-logobox'>
            <Link to="/about">
                <img className="nav-logo" src="/dice.png" alt="dice" />
            </Link>
            </div>
            <div className='nav-menus'>
                <span className="nav-menu" onClick={logoutRequest}>Logout</span>
                <Link className="nav-menu" to={`/profile/${currentUser}`}>Profile</Link>
                <Link className="nav-menu" to="/notice">Notice </Link>
                <Link className="nav-menu" to="/meeting">Meeting </Link>
                <Link className="nav-menu" to="/share">Information</Link>
            </div>
        </div>
    )
}