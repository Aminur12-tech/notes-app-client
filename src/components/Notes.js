import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Notes({ token, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setNotes(data);
      setShowUpgrade(data.length >= 3);
    } else if (res.status === 401) {
      onLogout();
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content: newContent }),
    });
    if (res.ok) {
      setNewContent('');
      fetchNotes();
    } else if (res.status === 403) {
      setError('Note limit reached. Please upgrade your plan.');
      setShowUpgrade(true);
    }
  };

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={onLogout}>Logout</button>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {note.content}
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <textarea
        placeholder="New note content"
        value={newContent}
        onChange={e => setNewContent(e.target.value)}
      />
      <button onClick={createNote}>Add Note</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showUpgrade && <p><strong>Upgrade to Pro to add unlimited notes.</strong></p>}
    </div>
  );
}
