import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetEventByIdQuery } from '../queries/events';
import { Button, Empty, message, Modal, Spin } from 'antd';
import { useMutation } from 'react-query';
import { API_ROUTES } from '../router/api-routes';
import { queryClient } from '../queries';

export function EventDetailsPage() {
	const { eventId } = useParams();
	const navigate = useNavigate();

	const {
		data: event,
		isLoading,
		isError,
	} = useGetEventByIdQuery(eventId as string, {
		enabled: Boolean(eventId),
	});

	const { mutate: deleteEvent } = useMutation({
		mutationFn: (id: string) => {
			return fetch(API_ROUTES.deleteEvent.path(id), {
				method: API_ROUTES.deleteEvent.method,
			});
		},
		onSuccess: async () => {
			message.success('Event deleted successfully');
			await queryClient.invalidateQueries({ queryKey: ['events'] });
			navigate('/');
		},
		onError: (error: Error) => {
			message.error(error?.message || 'Error deleting event');
		},
	});

	const contentJSX = isLoading ? (
		<Spin />
	) : event ? (
		<div>
			<div className="flex items-center justify-between gap-3">
				<h1 className="font-bold text-3xl mb-4">{event.name}</h1>

				<div className="flex items-center gap-5 flex-wrap">
					<Button
						danger
						onClick={() => {
							Modal.confirm({
								okText: 'Yes, Delete',
								cancelText: 'Cancel',
								type: 'error',
								okButtonProps: {
									danger: true,
								},
								title: 'Are you sure you want to delete this event?',
								onOk: () => {
									deleteEvent(event._id);
								},
							});
						}}
					>
						Delete
					</Button>

					<Link to={`/edit/${event._id}`}>
						<Button type="primary" tabIndex={-1} role="presentation">
							Edit
						</Button>
					</Link>
				</div>
			</div>
			<div className="h-[300px] bg-gray-400 mt-8 mb-5">
				<img src={event.image} alt={event.name} className="object-cover h-full w-full" />
			</div>
			<p className="mb-5">{event.description}</p>
			<p className="mb-2 font-medium">{event.location}</p>
			<time dateTime={event.date} className="text-gray-500">
				{new Date(event.date).toLocaleDateString('en-GB', {
					day: '2-digit',
					month: 'long',
					year: 'numeric',
				})}
			</time>
		</div>
	) : (
		<Empty description="Event not found" />
	);

	return (
		<main>
			<div className="container py-8">
				{isError ? <Empty description="Event not found" /> : contentJSX}
			</div>
		</main>
	);
}
