//statefulll authentication problem is once we restart the server we logged out  , memory intensive-use server memory
//stateless authentication -- remove state and generate id token for user jwt token json web token  -- that stores actual data inside token


const express= require('express');
const mongoose= require('mongoose');
const path= require('path');
const { checkforAuthentication,restrictTo } = require('./middleware/auth');


const cookieParser=require('cookie-parser');


const {connect}=require('./connection');
const URL=require('./models/url');
const staticRoute=require('./routes/staticRouter');
const urlRoute=require('./routes/url');


const userRoute=require('./routes/user');

const app=express();
const port=8000;

connect("mongodb://127.0.0.1:27017/short-url")
.then(()=>{
    console.log('connected to MongoDB');  // Successful connection to MongoDB
 
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:',err);  // Error connecting to MongoDB
 });

 app.set('view engine', "ejs");  ///for server side rendering
 app.set('views',path.resolve("./views"));   //ejs files are in the same directory

 app.use(express.json());
 app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(checkforAuthentication); //run everytimr

app.use('/url',restrictTo(["NORMAL","ADMIN"]),urlRoute);

app.use('/',staticRoute);

app.use('/user',userRoute);

app.get('/url/:shortId',async(req, res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId},
        {
        $push:{
            visitHistory:{
                timestamp:Date.now()
            },
        },
    } );
    res.redirect(entry.redirectURL);
});

app.listen(port,()=>{ console.log('listening on port '+port); });