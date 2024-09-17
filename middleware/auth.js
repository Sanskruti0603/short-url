const {getUser}=require("../service/auth")

function checkforAuthentication(req,res,next){
    const tokencookie=req.cookies?.token;
    req.user=null;
    if(!tokencookie ){
        return next();
    }

    const token=tokencookie;
    const user=getUser(token); //give user

    req.user=user;
    return next();
}

// async function restrictToLoggedinUserOnly(req,res,next){
//     // const userUid=req.cookies?.uid;
//     const userUid=req.headers?.['Authorization'];

//     if(!userUid){
//         return res.redirect("/login");
//     }

//     const token=userUid.split('Bearer ')[1]; //"Bearer token-wdwed2233232"
//     // const user=getUser(userUid);
//     const user=getUser(token);
//     if(!user) return res.redirect("/login");

//     req.user=user;
//     console.log("req.user:",req.user._id);
//     next();
// }


// async function checkAuth(req,res,next){
//     // const userUid=req.cookies?.uid;
//     const userUid=req.headers?.['authorization'];
//     const token=userUid.split('Bearer ')[1]; //"Bearer token-wdwed2233232"
//     // const user=getUser(userUid);
//     const user=getUser(token);
//     req.user=user;
//     next();
// }

//admin,normal
function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user)  return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end("Unauthorized");

        return next();
    }
}


module.exports={checkforAuthentication,restrictTo};