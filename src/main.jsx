import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import '@mantine/core/styles.css';

import './i18next/index.js';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';


createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <ModalsProvider>
      <Notifications position="bottom-right" autoClose={5000} />
      <App />
    </ModalsProvider>
  </MantineProvider>
)
