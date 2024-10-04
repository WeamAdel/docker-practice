import express from 'express';
import { getEvents, addEvent, deleteEvent, editEvent, getEventById } from '../controllers/events';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', getEvents);
router.post('/', addEvent);

router.get('/:id', async (req, res) => {
	await getEventById(req, res);
});

router.delete('/:id', async (req, res) => {
	await deleteEvent(req, res);
});

router.put('/:id', async (req, res) => {
	await editEvent(req, res);
});

export default router;
