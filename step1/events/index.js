const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();
dbConnection();

app.use(express.json());
app.use(cors());

app.get('/' , (req,res) => {
    res.json({
        ok:true,
        msg:'Active on events'
})
});

app.use('/', require('./routes/events.js'));


app.listen(process.env.PORT, () => {
    console.log('Running in the port', process.env.PORT);
});


//connect to mongoDB

//mongoose.connect('mongodb+srv://abnerdb:abner@rest.dqxfkyi.mongodb.net/?retryWrites=true&w=majority', () => 
//console.log('connected to MongoDb'));

//router.listen(3000);



