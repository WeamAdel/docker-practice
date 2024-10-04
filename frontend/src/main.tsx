import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queries';
import './styles/main.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ConfigProvider theme={{ token: { colorPrimary: '#172554' } }}>
				<RouterProvider router={router} />
			</ConfigProvider>
		</QueryClientProvider>
	</StrictMode>
);
