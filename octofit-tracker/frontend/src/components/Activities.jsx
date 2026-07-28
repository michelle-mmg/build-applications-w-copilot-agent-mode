import { useEffect, useState } from 'react';
import { buildApiUrl, extractItems } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          setActivities(extractItems(data));
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadActivities();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Track recent workouts and fitness sessions.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <ul className="list-group">
          {activities.map((activity, index) => (
            <li key={activity._id || activity.id || `${activity.type}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <p className="fw-semibold mb-1">{activity.type || 'Activity'}</p>
                  <p className="text-muted mb-0">{activity.date || 'No date provided'}</p>
                </div>
                <span className="badge bg-info-subtle text-info">{activity.durationMinutes || 0} min</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
