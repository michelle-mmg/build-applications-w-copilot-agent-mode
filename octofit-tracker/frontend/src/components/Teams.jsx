import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTeams() {
      try {
        const endpoint = '/api/teams/';
        const baseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        const response = await fetch(`${baseUrl}${endpoint}`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          setTeams(extractItems(data));
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadTeams();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">See the clubs and groups that are competing together.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <ul className="list-group">
          {teams.map((team, index) => (
            <li key={team._id || team.id || `${team.name}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <p className="fw-semibold mb-1">{team.name || 'Unnamed team'}</p>
                  <p className="text-muted mb-0">{team.description || 'A collaborative training group.'}</p>
                </div>
                <span className="badge bg-success-subtle text-success">{team.members?.length || 0} members</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
