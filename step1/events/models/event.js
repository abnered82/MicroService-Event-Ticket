const {Schema,model} = require('mongoose');

const EventSchema = Schema({

    _id:{
        type:String

    },
    name : {
        type : String,
        require : true
    },
    date : {
        type : String,
       
    },
    tickets : {
        type :  Number,
       
    },
    sold_tickets : {
        type :  Number,
        default:0
        
    },
    remaining_tickets : {
        type :  Number,
        
    },
});

EventSchema.method('toJSON', function() {
    const { __v, id, ...object } = this.toObject();

    object.uid = id;
    return object;
})


module.exports = model('Events',EventSchema);



