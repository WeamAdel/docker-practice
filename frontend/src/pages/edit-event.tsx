import { Empty, message, Spin } from 'antd';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { EventForm } from '../components/event-form';
import { API_ROUTES } from '../router/api-routes';
import type { IEvent } from '../types/Event';
import { queryClient } from '../queries';
import { useGetEventByIdQuery } from '../queries/events';
import dayjs from 'dayjs';

export function EditEventPage() {
	const { eventId } = useParams();
	const {
		data: event,
		isLoading: isLoadingEvent,
		isError,
	} = useGetEventByIdQuery(eventId as string, {
		enabled: Boolean(eventId),
	});

	const navigate = useNavigate();
	const { mutate: addEvent, isLoading: isEditing } = useMutation({
		mutationFn: (data: Omit<IEvent, 'id'>) => {
			return fetch(API_ROUTES.editEvent.path(eventId as string), {
				method: API_ROUTES.editEvent.method,
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((res) => res.json());
		},
		onSuccess: async () => {
			message.success('Event added successfully');
			await queryClient.invalidateQueries({ queryKey: ['events'] });
			navigate(`/event/${eventId}`);
		},
		onError: (error: Error) => {
			message.error(error?.message || 'Error adding event');
		},
	});

	const contentJSX = isLoadingEvent ? (
		<Spin />
	) : event ? (
		<EventForm
			initialValues={{ ...event, date: dayjs(event?.date) }}
			isLoading={isEditing}
			onSubmit={(data) => {
				addEvent(data);
			}}
		/>
	) : (
		<Empty description="Event not found" />
	);

	return (
		<main>
			<div className="container py-8">
				<h1 className="font-bold text-3xl mb-4">Add Event</h1>
				{isError ? <Empty description="Event not found" /> : contentJSX}
			</div>
		</main>
	);
}
