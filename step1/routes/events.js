const {Router} = require('express');
const {addEvent, deleteEvent,getEvent} = require('../controllers/events');
const router = Router();

router.get('/addevent', [ 
],addEvent);

router.get('/deleteevent', [
], deleteEvent);

router.get('/events', [
], getEvent);

module.exports = router;