const {Router} = require('express');
const {addEvent, deleteEvent} = require('../controllers/events');
const router = Router();

router.get('/addevent', [ 
],addEvent);

router.get('/deleteevent', [
], deleteEvent);


module.exports = router;