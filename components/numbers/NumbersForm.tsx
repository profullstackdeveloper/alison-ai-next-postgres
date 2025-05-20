'use client';

import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function NumbersForm({ onNumberAdded }: Readonly<{onNumberAdded: () => void}>) {
  const [number, setNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!Number.isInteger(Number(number))) {
      setError('Please enter a valid integer');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/numbers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: Number(number) }),
      });

      if (!response.ok) {
        throw new Error('Failed to save number');
      }

      setNumber('');
      onNumberAdded();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextField
          label="Enter an integer"
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
      {error && <Alert severity="error" className="mt-2">{error}</Alert>}
    </div>
  );
}