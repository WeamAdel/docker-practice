import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { AddEventPage } from '../pages/add-event';
import { EditEventPage } from '../pages/edit-event';
import { EventDetailsPage } from '../pages/event-details';
import { Layout } from '../components/layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				Component: () => <HomePage />,
			},
			{
				path: '/add',
				Component: () => <AddEventPage />,
			},
			{
				path: '/edit/:eventId',
				Component: () => <EditEventPage />,
			},
			{
				path: '/event/:eventId',
				Component: () => <EventDetailsPage />,
			},
		],
	},
]);
