const mongoose= require('mongoose');
const products = require('../models/products');

function GetRandomString(length){
    let str="";
    const chars="abcdefghijklmnopqrstuvwxyz0123456789";
    let index;
    for(let i=0;i<length;i++)
    {
        index=Math.floor(Math.random() * chars.length);
        str+=chars[index];
    }
    return str;

}




module.exports={

GetAll2:(req,res)=>{
        products.find({}).then((data)=>{
            if(data.length > 0)
            return res.render('Prodacts',{products:data});
            else 
            return res.render('notfound');
        })
    },
GetAll:(req,res)=>{
    products.find({}).then((data)=>{
        if(data.length > 0)
        return res.status(200).json({msg:data});
        else 
        return res.status(409).json({msg:"not found"});
    })
},
AddProd:(req,res)=>{
    const {ProdName,Url,Price,DeletedPrice,Description}=req.body;
    const pid = GetRandomString(4);
    products.find({ProdName}).then((rows)=>{
        if(rows.length > 0){
          return res.status(409).json({msg:`Product name Allready Exist=${ProdName}`});
        }
        const prod=new products({
            _id:new mongoose.Types.ObjectId(),
            Pid:pid,
            ProdName,
            Url,
            Price,
            DeletedPrice,
            Description
        });
        prod.save().then((prod)=>{
            return res.status(200).json({msg:prod});
        })
    })
},
DeleteProd:(req,res)=>{
const Pid = req.body;

products.deleteOne({Pid:Pid.Pid}).then((data)=>{
    if(data.acknowledged)
    return res.status(200).json({msg:"product deleted"});
    else
    res.status(409).json({msg:"something wrong"});
})
},
 UpdateProd:(req,res)=>{
    const {ProdName,Url,Price,DeletedPrice,Pid,Description}=req.body;
    products.updateOne({Pid},{$set:{ProdName,Url,Price,DeletedPrice,Description}}).then((data)=>{
        if(data.modifiedCount > 0)
        return res.status(200).json({msg:"product update  seccessfuly"});
        else 
        return res.status(409).json({msg:"something wrong"});
    })

 },
 GetProdById:(req,res)=>{
    const Pid = req.body;
    products.find({Pid}).then((data)=>{
        if(data.length == 1 )
        return res.status(200).json({msg:data});
        else 
        return res.status(200).json({msg:"product not found"});
    })
 }


}