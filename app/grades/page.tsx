'use client';

import * as React from 'react';
import { useState } from 'react';
import { GradesTable } from '../../components/GradesTable';
import GradesForm from '../../components/GradesForm';
import { Alert, Box } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';

export default function GradesPage() {
  
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const fetchNumbers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/grades');
      if (!response.ok) throw new Error('Failed to fetch numbers');
      const data = await response.json();
      setGrades(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNumbers();
  }, [refresh]);
  return (
    <ErrorBoundary>
      <div className="flex mb-4 gap-2.5 mx-2.5! my-2.5!">
        <Box>
          <GradesForm onGradeAdded={() => setRefresh((prev) => prev + 1)} />
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
        <GradesTable grades={grades} loading={loading} />
      </div>
    </ErrorBoundary>
  );
}