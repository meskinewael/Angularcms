const mongoose = require('mongoose');
const blogpostschema = new mongoose.Schema
{(  
    title:String,
    subtitle:String,
    image:String,
    smallImage:String,
    content:String,
    createdOn:{type:Date,default:Date.now})
   

});

module.exports = mongoose.model('BlogPost',blogpostschema);
