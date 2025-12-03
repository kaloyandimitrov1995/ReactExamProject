import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page page-narrow">
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </section>
  );
}