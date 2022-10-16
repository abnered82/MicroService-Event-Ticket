const {Router} = require('express');
const {ReserveTicket} = require('../controllers/tickets.js')
const router = Router();

router.get('/reserveticket',[],ReserveTicket);




module.exports = router;