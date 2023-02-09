const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const amqplib = require('amqplib');
const amqpUrl = process.env.AMQP_URL || 'amqp://rabbitmq';
//const { connect } = require('mongoose');

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


/*(async () => {
    const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
    const channel = await connection.createChannel();
    try {
      console.log('Publishing');
      const exchange = 'user.signed_up';
      const queue = 'user.sign_up_email';
      const routingKey = 'sign_up_email';
      
      await channel.assertExchange(exchange, 'direct', {durable: true});
      await channel.assertQueue(queue, {durable: true});
      await channel.bindQueue(queue, exchange, routingKey);
      
      const msg = {'id': Math.floor(Math.random() * 1000), 'email': 'user@domail.com', name: 'firstname lastname'};
      await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
      console.log('Message published');
    } catch(e) {
      console.error('Error in publishing message', e);
    } finally {
      console.info('Closing channel and connection if available');
      await channel.close();
      await connection.close();
      console.info('Channel and connection closed');
    }
    process.exit(0);
  })();*/
