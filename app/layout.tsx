import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MuiThemeProvider from '../components/theme/ThemeProvider';

export const metadata = {
  title: 'Alison Assessment',
  description: 'Alison Full Stack Developer Assessment',
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <CssBaseline></CssBaseline>
            <Layout>
              {
                children
              }
            </Layout>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}