const {Router} = require('express');
const {addEvent} = require('../controllers/events');
const router = Router();

router.get('/addevent', [ 
],addEvent);




module.exports = router;