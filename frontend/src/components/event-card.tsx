import { Card } from 'antd';
import { IEvent } from '../types/Event';
import { Link } from 'react-router-dom';

interface Props {
	event: IEvent;
}

export function EventCard({ event }: Props) {
	return (
		<Link to={`/event/${event._id}`}>
			<Card>
				<div className="h-[200px] bg-gray-400">
					<img src={event.image} alt={event.name} className="object-cover h-full w-full" />
				</div>

				<h3 className="font-bold text-lg my-2 line-clamp-2">{event.name}</h3>
				<p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>

				<div className="flex items-center justify-between gap-3 mt-4">
					<p className="text-sm text-gray-600">{event.location}</p>
					<time className="text-sm font-medium text-gray-600" dateTime={event.date}>
						{new Date(event.date).toLocaleDateString('en-GB', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</time>
				</div>
			</Card>
		</Link>
	);
}
