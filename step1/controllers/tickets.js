const {response} = require('express');
const Event = require('../models/event.js');
const Ticket = require('../models/tickets.js');

const ReserveTicket = async(req,res = response) => {
    const url = require('url');
    const queryObj = url.parse(req.url,true).query;

    try {
        const name = queryObj.name;
        const name_event = queryObj.event;
        const availableTicket = await Event.findById(name_event);
        if(availableTicket.remaining_tickets <= 0){
            return res.status(400).json ({
                ok:false,
                msg: 'Not tickets available'
            });
        }

        const ticket = new Ticket(queryObj);

        await ticket.save();

        await Event.findOneAndUpdate({ _id:name_event}, {
            $set:{
                sold_tickets: availableTicket.sold_tickets+1,
                remaining_tickets: availableTicket.remaining_tickets-1
            }
        })

        res.json({
            ok:true,
            msg: 'Ticket reserved',
            id: ticket.id,
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

module.exports = {ReserveTicket,deleteTicket}