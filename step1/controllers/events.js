const {response} = require('express');
const Event = require('../models/event.js');


const addEvent = async(req,res = response) => {

    const url = require('url');
    const queryObj=url.parse(req.url,true).query;

    try{

        const name = queryObj.name;
        const date = queryObj.date;
        const tickets = queryObj.tickets;
        const remaining_tickets = tickets;
        console.log(name);

        const existName = await Event.findOne({name:name});

        if(existName){
            return res.status(400).json({
                ok: false,
                msg: 'Exists on database'
            });
        }

        const event = new Event({name,date,tickets,remaining_tickets});

        await event.save();

        res.json({
            ok:true,
            msg:'added event',
            id: event.id,
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            ok:false,
            msg: 'Error to add an event'
        });
    }

}


module.exports = {addEvent}