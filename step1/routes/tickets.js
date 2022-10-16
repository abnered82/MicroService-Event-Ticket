const {Router} = require('express');
const {ReserveTicket,deleteTicket,getTickets} = require('../controllers/tickets.js')
const router = Router();

router.get('/reserveticket',[],ReserveTicket);

router.get('/deleteticket', [
], deleteTicket);

router.get('/tickets',[],getTickets);

module.exports = router;