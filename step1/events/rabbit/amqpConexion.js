const amqp = require('amqplib');
const config = require('./config.js')

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Eventos {
    channel;

    async createChannel() {
      const connection = await amqp.connect(config.rabbitMQ.url);
      this.channel = await connection.createChannel();
      await  this.channel.assertQueue("Events");
    }
    
    async publishMessage(eventos) {
      if (!this.channel) {
        await this.createChannel();
      }


      /*const exchangeName = config.rabbitMQ.exchangeName;
      await this.channel.assertExchange(exchangeName, "direct");
  
 
      await this.channel.publish(
        exchangeName,
        routingkey,
        Buffer.from(JSON.stringify(eventos))
      );*/

      this.channel.sendToQueue(
        "Events",
        Buffer.from(
            JSON.stringify(eventos)
        )
    );
  
      console.log(
        `add new  Event is sent to exchange ${eventos}`
      );
    }
  }



module.exports = Eventos;
