const {response} = require('express');
//const Event = require('../models/event.js');
const Ticket = require('../models/tickets.js');
const { v4: uuidv4 } = require('uuid');
const amqp = require('../rabbit/amqpConexion.js');

const Tickets = require('../rabbit/amqpConexion.js');

const ticketsrabbit = new Tickets();


const ReserveTicket = async(req,res = response) => {
    const url = require('url');
    const queryObj = url.parse(req.url,true).query;

    try {
        const _id = uuidv4();
        const name_event = queryObj.name;
        //const name_event = queryObj.event;


       if(!ticketsrabbit.consumeMessages(name_event)) {

        return res.status(400).json ({
            ok:false,
            msg: 'no existe'
        });


       } 
        console.log("desde la controller: " + name_event);
        const ticket = new Ticket({_id,name_event});
     
        await ticket.save();
        res.json({
            ok:true,
            msg: 'Ticket reserved',
            id: ticket._id,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok:false,
            msg:'Error to reserve a ticket'
        });
    }

   
    
    }




const deleteTicket = async(req,res = response) => {
    const url = require ('url');
    const queryObj=url.parse(req.url,true).query;
    const id = queryObj.id;

    try {
        const ticketDelete = await Ticket.findByIdAndRemove(id);
        res.json({
            ok:true,
            msg:'Ticket eliminated',
        });

    } catch (error) {

        console.log(error);

        return res.json({
            ok:false,
            msg:'Error to delete ticket'
        });
        
    }

}

const getTickets = async(req,res = response) => {

    const [tickets] = await Promise.all([
        Ticket.find()

    ]);

    res.json({
        tickets
    });
}

module.exports = {deleteTicket,getTickets,ReserveTicket}