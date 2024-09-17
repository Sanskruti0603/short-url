const User=require('../models/user');
const {setUser}=require('../service/auth');
const {v4:uuidv4}=require("uuid");  //for generate unique id after fetching pw is crrect after login

async function handleusersignup(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/"); 
}

async function handleuserlogin(req,res){
    const {email,password}=req.body;
    const user= await User.findOne({email,password});
    console.log("User",user);
    if(!user){
        return res.render("login",{error:"Inavlid email or password"});
    }
    // const sessionId=uuidv4();
    // setUser(sessionId,user);
    const token=setUser(user);  //gives token
    // res.cookie('uid',sessionId);
    
    
    res.cookie('token',token);

    // return res.json({token})
    return res.redirect("/");  //redirect on home page

}

module.exports={handleusersignup,handleuserlogin};