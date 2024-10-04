const API_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
	getAllEvents: {
		path: `${API_URL}/events`,
		method: 'GET',
	},
	getEventById: {
		path: (id: string) => `${API_URL}/events/${id}`,
		method: 'GET',
	},
	addEvent: {
		path: `${API_URL}/events`,
		method: 'POST',
	},
	editEvent: {
		path: (id: string) => `${API_URL}/events/${id}`,
		method: 'PUT',
	},
	deleteEvent: {
		path: (id: string) => `${API_URL}/events/${id}`,
		method: 'DELETE',
	},
};
