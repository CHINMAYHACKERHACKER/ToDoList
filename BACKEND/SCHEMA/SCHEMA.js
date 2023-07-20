const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    Title:String,
    UserData:String,
    StatusID:String,
    Status:String

})

module.exports=schema;