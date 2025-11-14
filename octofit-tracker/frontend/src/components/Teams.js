import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const codespace = process.env.REACT_APP_CODESPACE_NAME || '';
  const base = codespace ? `https://${codespace}-8000.app.github.dev/api/` : '/api/';
  const endpoint = `${base}teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const payload = data && data.results ? data.results : data;
        setItems(Array.isArray(payload) ? payload : []);
      })
      .catch(err => console.error('Teams fetch error:', err));
  }, [endpoint]);

  const handleCreate = (e) => {
    e.preventDefault();
    // placeholder: client-side add only
    if (!name) return;
    setItems(prev => [{ id: Date.now(), name }, ...prev]);
    setName('');
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Teams</h2>
        <small className="text-muted">Manage teams</small>
      </div>
      <div className="card-body">
        <form className="row g-2 mb-3" onSubmit={handleCreate}>
          <div className="col-auto">
            <input className="form-control form-control-sm" placeholder="New team name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary btn-sm" type="submit">Create</button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (<tr><td colSpan="3" className="text-center p-4">No teams</td></tr>)}
              {items.map((t, i) => (
                <tr key={t.id || i}>
                  <td>{i + 1}</td>
                  <td>{t.name || t.team_name || '-'}</td>
                  <td>{t.members || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
