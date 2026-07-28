import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness app for tracking workouts, teams, and progress.
              </p>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">User profiles and authentication</li>
                <li className="list-group-item">Activity logging and team management</li>
                <li className="list-group-item">Leaderboards and personalized workout suggestions</li>
              </ul>
              <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
                Check API health
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
