const express = require('express');
const router = express();
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

dbConnection();

router.use(express.json());
router.use(cors());

router.get('/' , (req,res) => {
    res.json({
        ok:true,
        msg:'Active'
})
});

router.listen(process.env.PORT, () => {
    console.log('Running in the port', process.env.PORT);
});


//connect to mongoDB

//mongoose.connect('mongodb+srv://abnerdb:abner@rest.dqxfkyi.mongodb.net/?retryWrites=true&w=majority', () => 
//console.log('connected to MongoDb'));

//router.listen(3000);



