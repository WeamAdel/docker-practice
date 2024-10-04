import { useQuery, type UseQueryOptions } from 'react-query';
import { API_ROUTES } from '../router/api-routes';
import type { IEvent, IEventResponse, IEventsResponse } from '../types/Event';
import { message } from 'antd';

export function useGetEventsQuery() {
	return useQuery({
		queryKey: ['events'],
		queryFn: () => {
			return fetch(API_ROUTES.getAllEvents.path, { method: API_ROUTES.getAllEvents.method })
				.then((res) => {
					return res.json() as Promise<IEventsResponse>;
				})
				.catch(() => {
					message.error('Failed to load events!');
				});
		},
		select: (data) => data?.data,
	});
}

export function useGetEventByIdQuery(
	id: string,
	options?: UseQueryOptions<IEventResponse, Error, IEvent>
) {
	return useQuery({
		queryKey: ['event', id],
		queryFn: () => {
			return fetch(API_ROUTES.getEventById.path(id), {
				method: API_ROUTES.getEventById.method,
			}).then((res) => {
				return res.json() as Promise<IEventResponse>;
			});
		},
		select: (data) => data?.data,
		...options,
	});
}
