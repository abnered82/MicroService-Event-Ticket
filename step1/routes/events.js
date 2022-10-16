const {Router} = require('express');

const router = Router();

const event = require('../models/event');

import { v4 as uuidv4 } from 'uuid';
uuidv4();

router.get('/', (req,res) => {

    res.send('we are en events');

});

router.post('/', (req,res) => {

    console.log(req.body);
});




module.exports = router;