const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async(req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{$set: req.body});
            res.status(200).json("Modification du compte enregistré !");
        }catch (err) {
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("Vous ne pouvez modifier que votre compte !");
    }
})
//delete user

router.delete("/:id", async(req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id );
            res.status(200).json("Votre compte a bien été supprimé :(");
        }catch (err) {
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("Vous ne supprimer que votre compte !");
    }
})

//get a user

router.get("/:id", async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, createdAt, ...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
})


//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) { //un utilisateur ne peut pas se follow lui même
      try {

        const user = await User.findById(req.params.id);

        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { following: req.params.id } });
          res.status(200).json("Utilisateur suivi avec succès!");
        } else {
          res.status(403).json("Vous suivez déjà cet utilisateur.");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("Opération impossible sur soit-même.");
    }
  });

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {

    try {
        const user = await User.findById(req.params.id);

        const currentUser = await User.findById(req.body.userId);

        if (user.followers.includes(req.body.userId)) {

        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });

        res.status(200).json("Utilisateur non-suivi avec succès!");
        } else {
        res.status(403).json("Vous ne suivez pas cet utilisateur.");
        }
    }catch(error){
        res.status(500).json(error);
    }

    } else{
    res.status(403).json("Opération impossible sur soit-même.");
    }
});


module.exports = router