const router = require("express").Router()
const User = require("../models/User.js")

//REGISTER

router.post("/register", async (req, res)=>{
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try{
        //save user and response
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err)
    }

});

//LOGIN

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("user not found")

        // const password = User.findOne({email:req.body.email});
        // !password && res.status(404).send("user not found")
    }catch(err){
        console.log(err);
    }
    

});


module.exports = router