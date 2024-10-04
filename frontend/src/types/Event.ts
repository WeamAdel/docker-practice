export interface IEvent {
	_id: string;
	name: string;
	description: string;
	date: string;
	location: string;
	image: string;
}

export interface IEventsResponse {
	data: IEvent[];
}

export interface IEventResponse {
	data: IEvent;
}
