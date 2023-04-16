const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt"); //pour cacher les mdp dans notre BDD

//REGISTER

router.post("/register", async (req, res)=>{
    try{
        //generer un nouveau mdp "crypté"
        const salt = await bcrypt.genSalt(10);
        const mdpCrypt = await bcrypt.hash(req.body.password, salt);
        //creer un nv user
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: mdpCrypt,
        });
        // sauv l'user et rendre le status ok
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }

});

//LOGIN

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("user not found")

        const mdpValid = await bcrypt.compare(req.body.password, user.password);
        !mdpValid && res.status(404).send("wrong password");

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    

});


module.exports = router
