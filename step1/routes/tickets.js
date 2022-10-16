const {Router} = require('express');
const {ReserveTicket,deleteTicket} = require('../controllers/tickets.js')
const router = Router();

router.get('/reserveticket',[],ReserveTicket);

router.get('/deleteticket', [
], deleteTicket);


module.exports = router;