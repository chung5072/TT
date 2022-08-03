import { Link} from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
import { removeToken } from "../features/user/loginSlice"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import Login from "../pages/User/LogIn"
import "./Home.css"
export default function Home() {
  const isLoggedIn = useSelector((state:RootState) => state.login.isLoggedIn)
  const token = useSelector((state:RootState) => state.login.token)
  const currentUser = useSelector((state:RootState) => state.login.currentUser)
  const dispatch = useAppDispatch()
  const logoutRequest: any = () => {
    dispatch(removeToken())
  }
    return (
        <div id="home"  className="container">
          {/* <h1>{isLoggedIn} {currentUser} {token}</h1> */}
          <div id="home-1" className="home1">
          <div className="imglogo"><img className="logo" src="/dice.png" alt="dice" /></div>
              {token === '' ? <span><Link className="menu" to="/login">Login</Link><Link className="menu" to="/signup">SignUp</Link></span> : <span><span className="logout" onClick={logoutRequest}>Logout</span><Link className="profile" to={`/profile/${currentUser}`}>Profile</Link></span>}
              <Link className="menu" to="/notice">Notice</Link>
              <Link className="menu" to="/meeting">Meeting</Link>
              <Link className="menu" to="/share">Information</Link>

          {/* ) : (
            <div>
              <span onClick={logoutRequest}>Logout</span>
              <Link to={`/profile/${currentUser}`}>Profile</Link>
            </div>
          )}
          <Link to="/notice">Notice</Link>
          <Link to="/meeting">Meeting</Link>
          <Link to="/share">Information</Link>
        </span> */}
          </div>
    </div>
  );
}