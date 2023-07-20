const mongoose=require("mongoose");
url="mongodb://0.0.0.0:27017/MAC";
mongoose.connect(url)
    
module.exports=mongoose;