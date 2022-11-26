const mongoose=require('mongoose');
mongoose.pluralize(null);
const ProductsSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Pid:String,
    ProdName:String,
    Url:String,
    Price:Number,
    DeletedPrice:Number,
    Description:String
});
module.exports=mongoose.model("Products",ProductsSchema);


