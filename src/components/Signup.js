import React, { useState } from 'react';
import '../App.css';

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [role, setRole] = useState('member'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, tenantId, role }),
    });

    if (res.ok) {
      setSuccess('Signup successful! You can now log in.');
      setError('');
      onSignup();
    } else {
      const data = await res.json();
      setError(data.message || 'Signup failed');
      setSuccess('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="email" placeholder="Email"
        value={email} onChange={e => setEmail(e.target.value)} required />
      <input
        type="password" placeholder="Password"
        value={password} onChange={e => setPassword(e.target.value)} required />
      <input
        type="text" placeholder="Tenant Slug (e.g., acme)"
        value={tenantId} onChange={e => setTenantId(e.target.value)} required />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}
