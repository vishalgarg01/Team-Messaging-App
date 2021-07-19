const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const postSchema=new Schema({
    channelId:{
        type:String,
        require:true
    },
    postedBy:{
        type:String,
        require:true
    },
    post:{
        type:String,
        require:true
    },

},{timestamps:true});

module.exports = mongoose.model('Post', postSchema); 