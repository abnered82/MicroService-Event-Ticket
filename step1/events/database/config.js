const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

       await mongoose.connect(process.env.DBCONNECTION, {
        
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        });

        console.log('connected to MongoDB');

    } catch (error) {
        console.log(error);
        throw new Error('Error to connect');
    }
}

function close(){
    return mongoose.disconnect();
}



module.exports = { dbConnection,close};