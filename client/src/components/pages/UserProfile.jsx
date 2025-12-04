import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as profileService from "../../utils/profileService.js";
import * as topicService from "../../utils/topicService.js";
import TopicCard from "../topics/TopicCard.jsx";
import Spinner from "../common/Spinner.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useProfile } from "../../contexts/ProfileContext.jsx";

export default function UserProfile() {
  const { userId } = useParams();
  const { user } = useAuth();
  const { profile: mainProfile } = useProfile();

  const [profile, setProfile] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isSelf = userId === user._id;

  const DEFAULT_AVATAR =
    "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1";

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      if (isSelf && mainProfile) {
        setProfile(mainProfile);
      } else {
        const data = await profileService.getByUserId(userId);
        if (active) setProfile(data || null);
      }
      try {
        const [allTopics, allLikes, myLike] = await Promise.all([
          topicService.getAll(),
        ]);
        if (!active) return;
        setTopics(allTopics.filter((t) => t._ownerId === userId));
      } catch (err) {
        if (active) setError(err.message);
      }

      if (active) setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, [userId, isSelf, mainProfile, user._id]);

  if (loading) {
    return (
      <section className="page">
        <Spinner />
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="page">
        <h2>This is a Dummy User, please click Edit Profile!</h2>
      </section>
    );
  }

  return (
    <section className="page">
      <article className="user-profile">
        <img
          className="sidebar-avatar"
          src={profile.avatarUrl || DEFAULT_AVATAR}
        />

        <h2>
          {profile.firstName || "Annonymous"} {profile.lastName || ""}
        </h2>

        <p>
          <strong>Job:</strong> {profile.job || "—"}
        </p>
        <p>
          <strong>Age:</strong> {profile.age || "—"}
        </p>
        <p>
          <strong>Nationality:</strong> {profile.nationality || "—"}
        </p>

        <p className="user-email">{profile.email}</p>
        <p className="user-bio">{profile.bio}</p>


      </article>

      <section>
        <h3>User Topics</h3>
        <div className="topics-grid">
          {topics.map((t) => (
            <TopicCard key={t._id} topic={t} />
          ))}
          {!topics.length && <p>This user has not posted anything yet.</p>}
        </div>
      </section>
    </section>
  );
}
