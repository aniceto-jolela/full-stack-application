import { Link, Outlet } from "react-router-dom"

const Header = () => (
    <div>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/security">Security</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
        <Outlet />
  </div>
)

export default Header