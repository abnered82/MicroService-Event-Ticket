const express = require('express');

const router = express();

const mongoose =require('mongoose');



router.get('/',(req,res) => {

    res.send('se pudo');
});

router.get('/events', (req,res) => {

});


//connect to mongoDB

mongoose.connect('mongodb+srv://abnerdb:abner@rest.dqxfkyi.mongodb.net/?retryWrites=true&w=majority', () => 
console.log('connected to MongoDb'));

router.listen(3000);


