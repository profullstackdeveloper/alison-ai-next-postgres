"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import CalculateIcon from '@mui/icons-material/Calculate';
import SchoolIcon from '@mui/icons-material/School';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation'

export default function Layout({ children }: Readonly<{children: React.ReactNode}>) {
  const currentPath = usePathname();
  return (
    <div className='w-full h-screen flex flex-col overflow-hidden'>
      <div className='grow-0 shrink-0'>
        <AppBar position="static">
          <Toolbar>
            <CalculateIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              AlisonAI Assessment
            </Typography>
            <Box>
              <Button 
                color="inherit" 
                component={Link} 
                href="/numbers"
                sx={{
                  borderBottom: currentPath === '/numbers' ? '2px solid white' : 'none',
                  borderRadius: 0,
                  mx: 1
                }}
                startIcon={<CalculateIcon />}
              >
                Numbers
              </Button>
              <Button color="inherit" component={Link} href="/grades" sx={{ 
                  borderBottom: currentPath === '/grades' ? '2px solid white' : 'none',
                  borderRadius: 0,
                  mx: 1
                }}
                startIcon={<SchoolIcon />}
              >
                Grades
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      <div className="p-4 grow shrink overflow-auto">{children}</div>
    </div>
  );
}