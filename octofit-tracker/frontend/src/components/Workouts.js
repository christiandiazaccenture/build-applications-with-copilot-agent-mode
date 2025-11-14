import React, { useEffect, useState } from 'react';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const payload = data && data.results ? data.results : data;
        setItems(Array.isArray(payload) ? payload : []);
      })
      .catch(err => console.error('Workouts fetch error:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Workouts</h2>
        <small className="text-muted">Logged workouts</small>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (<tr><td colSpan="5" className="text-center p-4">No workouts</td></tr>)}
              {items.map((w, i) => (
                <tr key={w.id || i}>
                  <td>{i + 1}</td>
                  <td>{w.name || w.title || '-'}</td>
                  <td>{w.type || '-'}</td>
                  <td>{w.calories || '-'}</td>
                  <td>{w.date || w.created_at || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
