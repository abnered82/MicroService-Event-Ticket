const {response} = require('express');
const Event = require('../models/event.js');
const { v4: uuidv4 } = require('uuid');


const addEvent = async(req,res = response) => {

    const url = require('url');
const queryObj=url.parse(req.url,true).query;

    try{
        const _id = uuidv4(); 
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

        const event = new Event({_id,name,date,tickets,remaining_tickets});

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

const deleteEvent = async(req, res = response) => {
    const url = require('url');
    const queryObj=url.parse(req.url,true).query;
    const id = queryObj.id;

    console.log(id);

    try {
        const eventDe = await Event.findByIdAndRemove(id);
        res.json({
            ok:true,
            msg:'event eliminated'
        })
    } catch (error) {
        console.log(error);

        return res.json({
            ok:false,
            msg: "Error to delete event"
        });
        
    }

}

const getEvent = async  (req,res = response) =>{

    const [events] = await Promise.all([
        Event.find()
    ]);

    console.log(events);

    res.json({
        events
    });
}

const SearchTickets= async (req,res = response) => {

    const url = require('url');
    const queryObj=url.parse(req.url,true).query;

    const tickets = await Event.find({
        $or:[{ date : queryObj.date}],
        $and:[{remaining_tickets : { $gt:queryObj.tickets}}]
    });

    res.json({
        results:tickets
    })
}
module.exports = {addEvent,deleteEvent,getEvent,SearchTickets} 