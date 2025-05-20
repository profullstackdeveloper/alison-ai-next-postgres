'use client';

import * as React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const ErrorFallback = ({ error, resetErrorBoundary }: {error: Error, resetErrorBoundary: () => void}) => {
  return (
    <div className="p-4">
      <Alert severity="error">
        Something went wrong: {error?.message || 'Unknown error'}
        <Button
          variant="contained"
          color="primary"
          onClick={resetErrorBoundary}
          className="ml-4"
        >
          Try Again
        </Button>
      </Alert>
    </div>
  );
};

export default function ErrorBoundary({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught in ErrorBoundary:', error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}