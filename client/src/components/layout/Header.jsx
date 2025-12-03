import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          Freelance News
        </Link>

        <nav className="nav">
          {isAuthenticated && (
            <>
              <NavLink to="/" end>
                Home
              </NavLink>
              <NavLink to="/topics/create">Create Topic</NavLink>
              <NavLink to="/profile/edit">Edit Profile</NavLink>
            </>
          )}

          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/faq">FAQ</NavLink>

          <div className="nav-right">
            {isAuthenticated ? (
              <>
                <span className="nav-user">Hello, {user.username || user.email}</span>
                <button className="btn btn-secondary" onClick={logoutHandler}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
