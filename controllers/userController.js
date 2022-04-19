const User = require("../models/userSchema")
const bcryptjs = require("bcryptjs")
const validate =require("../config/validator");
const bcrypt = require("bcryptjs/dist/bcrypt");

//create a new user
const createUser = async(req, res)=>{
    const {username, email, password} = req.body;
    const valid = await validate ({username, email, password});

    if(valid) {
        const hashedPassword = await bcrypt.hash(valid.password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    }else {
        res.status(404).json({
            message: "Invalid data",
        });
    }
};


module.exports={createUser}