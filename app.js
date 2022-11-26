require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const morgan=require('morgan');
const mongoose=require('mongoose');
const hbs=require('hbs');
const path=require('path');
const uri=process.env.MONGO_COMN;  
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log("mongo db connected ")});
app.use(express.urlencoded({extended:false}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use(morgan('dev'));   
app.use(cors());
const memebershiprouter=require('./api/v1/routes/membership.js');
app.use("/member",memebershiprouter);

const productrouter=require('./api/v1/routes/products.js');
app.use("/product",productrouter);

//ניתוב לעמוד הרשמה: 

app.get('/',(req,res)=>{
    res.render('register');
});

app.get('/Prodacts',(req,res)=>{
    res.render('Prodacts');
});

app.get('/LoginMember',(req,res)=>{
    res.render('login');
});

app.get('/wm',(req,res)=>{
    
    res.render('wm');
});




app.all("*",(req,res)=>{
    res.status(404).json({msg:"404 page not found"});
});

module.exports=app; 