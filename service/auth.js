// const sessionIdtoUsermap=new Map();

const jwt = require('jsonwebtoken');
const secret="sanskruti@610"
// function setUser(id,user){
//     return sessionIdtoUsermap.set(id,user);
// }

//function to make token in stateless 
function setUser(user){
   try{
        return jwt.sign({_id:user._id,email:user.email,role:user.role},secret)   //secret key - ''
   }
   catch(e){
    return null;
   }
    
}


// function getUser(id){
//      return sessionIdtoUsermap.get(id);
// }


//verify the user and get
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT verification error:", err);
        return null;
    }
}

module.exports={setUser,getUser}