const amqp = require('amqplib');

const config = require('./config.js')

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Tickets {
    channel;
  
    async createChannel() {
      const connection = await amqp.connect(config.rabbitMQ.url);
      this.channel = await connection.createChannel();
    }
  
    async publishMessage(routingkey , tickets) {
      if (!this.channel) {
        await this.createChannel();
      }
  
      const exchangeName = config.rabbitMQ.exchangeName;
      await this.channel.assertExchange(exchangeName, "direct");
  
 
      await this.channel.publish(
        exchangeName,
        routingkey,
        Buffer.from(JSON.stringify(tickets))
      );
  
      console.log(
        `The name event is ${routingkey} add new  Ticket is sent to exchange ${exchangeName}`
      );
    }

    async consumeMessages(name_event) {
      if (!this.channel) {
        await this.createChannel();
      }
      var eventfromrabbit;
    
      this.channel.consume("Events", (data) => {
        eventfromrabbit = JSON.parse(data.content);
        this.processEvent(eventfromrabbit, name_event);
      });
    }

    processEvent(event, name_event) {
      for (let i in event) {
        if (name_event == i.name) {
          console.log(i.name);
          return true;
        }
      }
    }

  }



module.exports = Tickets;
