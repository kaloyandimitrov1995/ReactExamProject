import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import * as profileService from '../../utils/profileService.js';
import { useEffect, useState } from 'react';

const DEFAULT_AVATAR =
  'https://i.ibb.co/6sFq5Xw/default-avatar.png';

export default function Sidebar() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;

    let ignore = false;

    profileService.getMyProfile(user._id).then((p) => {
      if (!ignore) setProfile(p);
    });

    return () => (ignore = true);
  }, [user]);

  if (!user) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <img
          src={profile?.avatarUrl || DEFAULT_AVATAR}
          alt="avatar"
          className="sidebar-avatar"
        />

        <h3>{profile?.firstName} {profile?.lastName}</h3>

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
