export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Freelance World by the Freelancers</p>
        <p className="footer-small">SoftUni Exam React Project</p>
      </div>
    </footer>
  );
}
