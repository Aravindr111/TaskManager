const mongoose=require('mongoose');

const eventSchema= new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location:{ type: String, required: true },
    game:{ type: String, required: true },
    image:{type:Buffer},
    imageType:{type:String},
    

})

module.exports = mongoose.model('Event', eventSchema);