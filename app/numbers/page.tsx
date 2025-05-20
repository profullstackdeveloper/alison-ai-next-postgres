'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import NumbersForm from '../../components/NumbersForm';
import NumbersTable from '../../components/NumbersTable';
import Alert from '@mui/material/Alert';
import { Box, Stack } from '@mui/material';

export default function NumbersPage() {
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const fetchNumbers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/numbers');
      if (!response.ok) throw new Error('Failed to fetch numbers');
      const data = await response.json();
      setNumbers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, [refresh]);

  return (
    <Stack flexDirection={'row'} gap={'10px'} marginX={'10px'} marginY={'10px'}>
      <Box>
        <h1 className="text-2xl font-bold mb-4">Numbers</h1>
        <NumbersForm onNumberAdded={() => {
              setRefresh((prev) => prev + 1)
          }} />
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <NumbersTable  numbers={numbers} loading={loading} />
    </Stack>
  );
}