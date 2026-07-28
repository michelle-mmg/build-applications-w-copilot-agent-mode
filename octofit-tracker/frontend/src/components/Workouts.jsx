import { useEffect, useState } from 'react';
import { fetchJson, getApiBaseUrl } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        const data = await fetchJson('workouts');
        if (active) {
          setWorkouts(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Explore recommended exercises and training plans.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <ul className="list-group">
          {workouts.map((workout, index) => (
            <li key={workout._id || workout.id || `${workout.name}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <p className="fw-semibold mb-1">{workout.name || 'Workout plan'}</p>
                  <p className="text-muted mb-0">{workout.description || 'A training routine for the next session.'}</p>
                </div>
                <span className="badge bg-warning-subtle text-warning">{workout.durationMinutes || 0} min</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
