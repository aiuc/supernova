const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt"); //pour cacher les mdp dans notre BDD

//REGISTER : SIGNUP

router.post("/register", async(req, res)=>{

    try{
        //generer un nouveau mdp "crypté"
        const salt = await bcrypt.genSalt(10); 
        const mdpCrypt = await bcrypt.hash(req.body.password, salt);
        //creer un Nouveau user
        const nvUtilisateur = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: mdpCrypt,
        });

        // sauv l'user et rendre le status ok
        const utilisateur = await nvUtilisateur.save();
        res.status(200).json(utilisateur);
    }catch(error){
        res.status(500).json(error);
    }

});

//LOGIN

router.post("/login", async(req, res)=>{
    try{
        const utilisateur = await User.findOne({email:req.body.email});
    
        !utilisateur && res.status(404).send("l'utilisateur n'a pas été trouvé !")

        const mdpValid = await bcrypt.compare(req.body.password, utilisateur.password);
        !mdpValid && res.status(404).send("le mot de passe est incorrect !");

        res.status(200).json(utilisateur);
    }catch(error){
        res.status(500).json(error);
    }
    
});


module.exports = router
