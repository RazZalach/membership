const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const membership = require('../models/membership');
const { json } = require('express');


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

Get_All_Active:(req,res)=>{
    
    membership.find({Status:true}).then((data)=>{
        if(data.length > 0)
        {
            
            return res.render('wm',{member:data});
        }
        else
        {
           return res.render('notfound');
        }
    })
},
Get_All_Active2:(req,res)=>{
    namedata = [];
    membership.find({Status:true}).then((data)=>{
        data.forEach(item => {
            namedata.push(item.Name + " " + item.Lastname);
        });
        if(namedata.length > 0)
        {   
            return res.status(200).json({msg:namedata});
        }
        else
        {
           return res.status(409).json('notfound');
        }
    })
},

    
Register:(req,res)=>{
    const {Email,Name,Lastname,Phone,Address,Age}=req.body;
   var pass = GetRandomString(12);
    membership.find({Email}).then((rows)=>{
        if(rows.length > 0){
          return res.status(409).json({msg:`Email Allready Exist=${Email}`});
        }
        subj="סיסמת הרשמה: ";
                body=`<h1> ${pass} </h1>`;
                require('../../../emailsend').SendEmail(Email,subj,body);
            const member=new membership({
             _id:new mongoose.Types.ObjectId(),
              Email,
              Name,
              Lastname,
              Phone,
              Address,
              Age,
              Pass:pass,
              Status:false
             
             });
             member.save().then((members)=>{
            return res.status(200).json({msg:1});
          });
     
    });
    },

    Login:(req,res)=>{
        const {Email,pass}=req.body;
        membership.find({Email}).then((memb)=>{
          
            if(memb.length == 1 && memb[0].Pass == pass){
               
                membership.updateOne({Email},{$set:{Status:true}}).then((data)=>{
           
                    if(data.modifiedCount == 1){
                        //api call בהמשך
                        return res.status(200).json({msg:"חבר המועדון שלך אומת בהצלחה \n אנו שמחים לקבל אותך למשפחתנו \n בכדי לממש חבר מועדון בחנות אנא הזדהה באמצעות המייל שלך"});
                    }
                    else{
                        return res.status(200).json({msg:"חשבונך כבר אומת "});
                    }
                })
            }
            else{
                    return res.status(409).json({msg:"לצערנו לא הצלחנו לאמת את המייל שלך \n הסיסמא או המייל שגויים , אנא נסה שנית"});
            } 
            });
    },
    DeleteMember:(req,res)=>{
        membership.deleteOne({Email:req.params.Email}
            ).then((data)=>{
            if(data.acknowledged)
            return res.status(200).json({msg:"membership deleted"});
            else
            res.status(409).json({msg:"something wrong"});
        })
    }
}