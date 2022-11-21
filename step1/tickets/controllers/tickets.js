const {response} = require('express');
//const Event = require('../models/event.js');
const Ticket = require('../models/tickets.js');
const { v4: uuidv4 } = require('uuid');

/*
const ReserveTicket = async(req,res = response) => {
    const url = require('url');
    const queryObj = url.parse(req.url,true).query;

    try {
        const _id = uuidv4();
        const name = queryObj.name;
        const name_event = queryObj.event;
        const availableTicket = await Event.findById(name_event);
        if(availableTicket.remaining_tickets <= 0){
            return res.status(400).json ({
                ok:false,
                msg: 'Not tickets available'
            });
        }

        const ticket = new Ticket({_id,name});

        await ticket.save();

        await Event.findOneAndUpdate({_id:name_event}, {
            $set:{
                sold_tickets: availableTicket.sold_tickets+1,
                remaining_tickets: availableTicket.remaining_tickets-1
            }
        })

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
}*/

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

module.exports = {deleteTicket,getTickets}