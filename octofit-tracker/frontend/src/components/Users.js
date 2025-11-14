import React, { useEffect, useState } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || '';
  const base = codespace ? `https://${codespace}-8000.app.github.dev/api/` : '/api/';
  const endpoint = `${base}users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const payload = data && data.results ? data.results : data;
        setItems(Array.isArray(payload) ? payload : []);
      })
      .catch(err => console.error('Users fetch error:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Users</h2>
        <small className="text-muted">Registered users</small>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-sm table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (<tr><td colSpan="4" className="text-center p-4">No users</td></tr>)}
              {items.map((u, i) => (
                <tr key={u.id || i}>
                  <td>{i + 1}</td>
                  <td>{u.username || u.name || '-'}</td>
                  <td>{u.email || '-'}</td>
                  <td>{u.date_joined || u.created_at || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
