import type { Request, Response } from 'express';
import Event from '../models/Event';

const getEvents = async (_req: Request, res: Response) => {
	try {
		const events = await Event.find().sort({ date: 1 });
		res.status(200).json({ data: events });
	} catch (error) {
		console.error('Error fetching events:', error);
		res.status(500).json({ message: 'Server error while fetching events' });
	}
};

const getEventById = async (req: Request, res: Response) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ message: 'Event not found' });
		}
		res.status(200).json({ data: event });
	} catch (error) {
		console.error('Error fetching event:', error);
		res.status(500).json({ message: 'Server error while fetching event' });
	}
};

const addEvent = async (req: Request, res: Response) => {
	console.log(req);
	console.log(req.body);

	try {
		const newEvent = new Event(req.body);
		const savedEvent = await newEvent.save();
		res.status(201).json({ data: savedEvent });
	} catch (error) {
		console.error('Error adding event:', error);
		res.status(500).json({ message: 'Server error while adding event' });
	}
};

const deleteEvent = async (req: Request, res: Response) => {
	try {
		const deletedEvent = await Event.findByIdAndDelete(req.params.id);
		if (!deletedEvent) {
			return res.status(404).json({ message: 'Event not found' });
		}
		res.status(200).json({ message: 'Event deleted successfully' });
	} catch (error) {
		console.error('Error deleting event:', error);
		res.status(500).json({ message: 'Server error while deleting event' });
	}
};

const editEvent = async (req: Request, res: Response) => {
	try {
		const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updatedEvent) {
			return res.status(404).json({ message: 'Event not found' });
		}
		res.status(200).json({ data: updatedEvent });
	} catch (error) {
		console.error('Error updating event:', error);
		res.status(500).json({ message: 'Server error while updating event' });
	}
};

export { getEvents, addEvent, getEventById, editEvent, deleteEvent };
