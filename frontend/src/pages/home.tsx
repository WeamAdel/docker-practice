import { Button, Empty, Spin } from 'antd';
import { useGetEventsQuery } from '../queries/events';
import { EventCard } from '../components/event-card';
import { Link } from 'react-router-dom';

export function HomePage() {
	const { data, isLoading, isError } = useGetEventsQuery();
	const eventsJSX = data
		? data.map((event) => {
				return (
					<li key={event._id}>
						<EventCard event={event} />
					</li>
				);
		  })
		: [];

	const contentJSX = isLoading ? (
		<Spin />
	) : data?.length === 0 ? (
		<Empty description="No events found" />
	) : (
		<ul className="grid gap-8 [grid-template-columns:repeat(auto-fit,_minmax(clamp(180px,15vw,250px),300px))]">
			{eventsJSX}
		</ul>
	);

	return (
		<main>
			<div className="container py-8">
				<div className="flex items-center justify-between gap-6">
					<h1 className="font-bold text-3xl mb-4">Events</h1>
					<Link to="/add">
						<Button type="primary" role="presentation" tabIndex={-1}>
							Add Event
						</Button>
					</Link>
				</div>
				{isError ? <Empty description="Failed to load events" /> : contentJSX}
			</div>
		</main>
	);
}
