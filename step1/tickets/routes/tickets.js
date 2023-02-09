const {Router} = require('express');
const {deleteTicket,getTickets,ReserveTicket} = require('../controllers/tickets.js')
const router = Router();

router.get('/reserveticket',[],ReserveTicket);

router.get('/deleteticket', [
], deleteTicket);

router.get('/tickets',[],getTickets);

module.exports = router;