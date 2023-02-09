const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection} = require('./database/config');

const Consul = require('consul');
const consul = new Consul({host:'consul', port: '8500'});
const app = express();

// register consul
async function registerService() {
    try {
      await consul.agent.service.register({
        name: "mytickets",
        address: "mytickets",
        port: 3000
      });
      console.log('Successfully registered');
    } catch (error) {
      console.error('Error registering with Consul:', error);
    }
}


dbConnection();

registerService();



app.use(express.json());
app.use(cors());

app.get('/' , (req,res) => {
    res.json({
        ok:true,
        msg:'Active on tickets'
})
});


app.use('/', require('./routes/tickets.js'));

app.listen(process.env.PORT, () => {
    console.log('Running in the port', process.env.PORT);
});




//connect to mongoDB

//mongoose.connect('mongodb+srv://abnerdb:abner@rest.dqxfkyi.mongodb.net/?retryWrites=true&w=majority', () => 
//console.log('connected to MongoDb'));

//router.listen(3000);



