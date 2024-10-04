import { message } from 'antd';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { EventForm } from '../components/event-form';
import { API_ROUTES } from '../router/api-routes';
import type { IEvent } from '../types/Event';
import { queryClient } from '../queries';

export function AddEventPage() {
	const navigate = useNavigate();
	const { mutate: addEvent, isLoading } = useMutation({
		mutationFn: (data: Omit<IEvent, 'id'>) => {
			return fetch(API_ROUTES.addEvent.path, {
				method: API_ROUTES.addEvent.method,
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((res) => res.json());
		},
		onSuccess: async () => {
			message.success('Event added successfully');
			await queryClient.invalidateQueries({ queryKey: ['events'] });
			navigate('/');
		},
		onError: (error: Error) => {
			message.error(error?.message || 'Error adding event');
		},
	});

	return (
		<main>
			<div className="container py-8">
				<h1 className="font-bold text-3xl mb-4">Add Event</h1>

				<EventForm
					isLoading={isLoading}
					onSubmit={(data) => {
						addEvent(data);
					}}
				/>
			</div>
		</main>
	);
}
