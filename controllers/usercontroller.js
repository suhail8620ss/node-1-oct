const bcrypt = require('bcrypt')
const User = require('../models/User');
const saltRounds = 10;
async function signUp(req, res) {
     try {
        // console.log(req.body, 'req.body');
         let password = bcrypt.hashSync(req.body.password,saltRounds);
       //  console.log(password, 'password');
         let user = new User(req.body);
         user.password = password;
         await user.save();
         res.redirect('/'); // redirect me path diya jata hai..
    //     res.end("<h1> Sign up successfully.<h1>")
     } catch(err) {
          console.log(err);
     }
}
async function doLogin(req, res) {
     try {
          console.log(req.body, 'req.body');
          let user = await User.findOne({email:req.body.email});
          if(!User) {
               res.end("<h1> No USer Exit..</h1>");
          } else {
               let isMatch =await bcrypt.compare(req.body.password, user.password);

               if(isMatch) {
                    res.end("<h1> Login successfull ..</h1>");
               } else {
                    res.end("<h1> InCorrect Password..</h1>");
               }
          }
          //res.end("<h1> Login is in  process </h>");
     } catch(err) {
      console.log(err);
     }
}
module.exports = {
     signUp,
     doLogin
}