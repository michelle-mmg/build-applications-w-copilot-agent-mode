import { useEffect, useState } from 'react';
import { buildApiUrl, extractItems } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          setUsers(extractItems(data));
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">Browse the registered fitness community members.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <ul className="list-group">
          {users.map((user, index) => (
            <li key={user._id || user.id || `${user.name}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <p className="fw-semibold mb-1">{user.name || 'Unnamed user'}</p>
                  <p className="text-muted mb-0">{user.email || 'No email provided'}</p>
                </div>
                <span className="badge bg-secondary-subtle text-secondary">{user.role || 'member'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
