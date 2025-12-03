import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as profileService from '../../utils/profileService.js';
import * as topicService from '../../utils/topicService.js';
import TopicCard from '../topics/TopicCard.jsx';
import Spinner from '../common/Spinner.jsx';
import ErrorBox from '../common/ErrorBox.jsx';

export default function UserProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [topics, setTopics] = useState([]);
  const [likeCount, setLikeCount] = useState(0); // simple like on profile
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [profileData, allTopics] = await Promise.all([
          profileService.getByUserId(userId),
          topicService.getAll(),
        ]);

        if (!isMounted) return;

        setProfile(profileData || null);
        setTopics(allTopics.filter((t) => t._ownerId === userId));
      } catch (err) {
        if (!isMounted) return;
        setError(err.message);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const likeProfileHandler = () => {
    setLikeCount((c) => c + 1); // again: client-side "like" just to show interaction
  };

  if (loading) {
    return (
      <section className="page">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="page">
      <ErrorBox message={error} />

      <article className="user-profile">
        <h2>{profile?.displayName || 'Freelancer'}</h2>
        <p className="user-email">{profile?.email}</p>
        <p className="user-bio">{profile?.bio || 'This user has not written a bio yet.'}</p>

        <button className="btn btn-secondary btn-small" onClick={likeProfileHandler}>
          👍 Like profile ({likeCount})
        </button>
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
