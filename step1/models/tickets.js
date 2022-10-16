const {Schema,model} = require('mongoose');

const ticketSchema = Schema({
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