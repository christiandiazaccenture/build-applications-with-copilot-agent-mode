import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const payload = data && data.results ? data.results : data;
        setItems(Array.isArray(payload) ? payload : []);
      })
      .catch(err => console.error('Activities fetch error:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Activities</h2>
        <div>
          <button className="btn btn-sm btn-primary me-2">New Activity</button>
          <button className="btn btn-sm btn-outline-secondary">Refresh</button>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>User</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan="7" className="text-center p-4">No activities found</td></tr>
              )}
              {items.map((it, idx) => (
                <tr key={it.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{it.type || it.activity_type || '-'}</td>
                  <td>{it.user || (it.user_name) || '-'}</td>
                  <td>{it.distance || '-'}</td>
                  <td>{it.duration || '-'}</td>
                  <td>{it.date || it.created_at || '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setActive(it)}>Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - simple Bootstrap modal pattern triggered by state */}
      {active && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setActive(null)}></button>
              </div>
              <div className="modal-body">
                <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(active, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActive(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
