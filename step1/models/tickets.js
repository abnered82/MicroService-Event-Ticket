const {Schema,model} = require('mongoose');

const ticketSchema = Schema({

    _id : {
         type:String
    },
    name_event : {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },

    date:{
        type: Date,
        default: Date.now
    }
});

ticketSchema.method('toJson',function(){
    const{__v,id,...object} = this.toObject();
    object.uid = id;
    return object;
})

module.exports = model('Ticket',ticketSchema);