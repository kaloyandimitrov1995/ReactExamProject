import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useProfile } from '../../contexts/ProfileContext.jsx';

const DEFAULT_AVATAR = "https://i.stack.imgur.com/l60Hf.png";

export default function Sidebar() {
  const { user } = useAuth();
  const { profile } = useProfile();

  if (!user) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <img
          src={profile?.avatarUrl || DEFAULT_AVATAR}
          alt="avatar"
          className="sidebar-avatar"
        />
        
        <h3>User Info</h3>
        <p className="sidebar-field"><strong>First Name:</strong> {profile?.firstName || '—'}</p>
        <p className="sidebar-field"><strong>Last Name:</strong> {profile?.lastName || '—'}</p>
        <p className="sidebar-field"><strong>Job:</strong> {profile?.job || '—'}</p>
        <p className="sidebar-field"><strong>Age:</strong> {profile?.age || '—'}</p>
        <p className="sidebar-field"><strong>Nationality:</strong> {profile?.nationality || '—'}</p>

        <Link to="/profile/edit" className="btn btn-secondary btn-small sidebar-edit-btn">
          Edit Profile
        </Link>
      </div>
    </aside>
  );
}
