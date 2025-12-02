import { Link, NavLink } from 'react-router-dom';

export default function Header() {

  return (
    <header>
      <div>
        <Link to="/">
          Freelance News
        </Link>

        <nav className="nav">
        <NavLink to="/">Home</NavLink> 
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
</nav>
      </div>
    </header>
  );
}
