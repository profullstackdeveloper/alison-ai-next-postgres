'use client';

import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function GradesForm({onGradeAdded}: Readonly<{onGradeAdded: () => void}>) {
  const [className, setClassName] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const classes = ['Math', 'Science', 'History'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const gradeNum = Number(grade);
    if (!classes.includes(className)) {
      setError('Please select a valid class');
      setLoading(false);
      return;
    }
    if (!Number.isInteger(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      setError('Grade must be an integer between 0 and 100');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class: className, grade: gradeNum }),
      });

      if (!response.ok) {
        throw new Error('Failed to save grade');
      }

      setClassName('');
      setGrade('');
      onGradeAdded();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        <TextField
          select
          label="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          variant="outlined"
          fullWidth
        >
          {classes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Grade (0-100)"
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
        {error && <Alert severity="error" className="mt-2">{error}</Alert>}
      </form>
    </div>
  );
}