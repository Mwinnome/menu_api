const User = require("../models/userSchema")
const bcryptjs = require("bcryptjs")
const validate =require("../config/validator");
const bcrypt = require("bcryptjs/dist/bcrypt");
const {generateToken }=require("../utils/gennerateToken")

//create a new user
const createUser = async(req, res)=>{
    const {username, email, password} = req.body;
    const valid = await validate ({username, email, password});

    if(valid) {
        const hashedPassword = await bcrypt.hash(valid.password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
         if (user) {
            res.status(201).json({
              username:user.name,
              email:user.email,
              id:user._id,
              token:generateToken(user._id)
            });
         }

        
    }else {
        res.status(404).json({
            message: "Invalid data",
        });
    }
};


module.exports={createUser}