const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const {ObjectId} =mongoose.Schema.Types
const channelSchema=new Schema({
    channelname:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    tags:[{
        type:String,
        require:true
    }],
},{timestamps:true});

module.exports = mongoose.model('Channel', channelSchema);