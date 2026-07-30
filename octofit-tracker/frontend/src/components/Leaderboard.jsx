import { useEffect, useState } from 'react';
import { fetchJson, getApiBaseUrl } from '../api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      try {
        const items = await fetchJson('leaderboard');
        if (active) {
          setEntries(items);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unable to load leaderboard.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadLeaderboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Watch teams climb the standings.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-muted">No leaderboard entries found.</td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry._id || entry.id || `${entry.name}-${index}`}>
                    <td>{entry.rank || index + 1}</td>
                    <td>{entry.name || entry.teamName || entry.userName || 'Unnamed entry'}</td>
                    <td>{entry.score || entry.points || entry.total || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
