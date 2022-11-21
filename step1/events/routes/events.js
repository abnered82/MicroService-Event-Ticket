const {Router} = require('express');
const {addEvent, deleteEvent,getEvent,SearchTickets} = require('../controllers/events.js');
const router = Router();

router.get('/addevent', [ 
],addEvent);

router.get('/deleteevent', [
], deleteEvent);

router.get('/events', [
], getEvent);

router.get('/searchtickets',[],SearchTickets);
module.exports = router;