import { Link} from "react-router-dom"
export default function Home() {
    return (
        <div>
          <span>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
            <Link to="/notice">Notice</Link>
            <Link to="/recruit">Recruit</Link>
            <Link to="/share">Information</Link>
          </span>
        </div>
        
    )
}