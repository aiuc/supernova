const router = require("express").Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");

//CREATION D'UN POST
router.post("/", async(req, res)=>{
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
    }
})

//MODIFIER UN POST
router.put("/:id", async(req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("Le post a bien été modifié !");
        }else{
            res.status(403).json("Vous ne pouvez modifier que vos posts !");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//SUPPRIMER UN POST
router.delete("/:id", async(req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("Le post a bien été supprimé !");
        }else{
            res.status(403).json("Vous ne pouvez supprimer que vos posts !");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


//LIKER UN POST ET LE DISLIKER
router.put("/:id/like", async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes:req.body.userId}});
            res.status(200).json("Le post a bien été liké !");
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("Le post a bien été disliké !");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a post

router.get("/:id", async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err)
    }
})
//RECUPERER SES PROPRES POSTS
router.get("/:id/posts", async (req, res)=>{
    try {
        
        const currentUser = await User.findById(req.params.id);
        const userPosts = await Post.find({userId : currentUser._id});

        res.status(200).json(userPosts)
    } catch (err) {
        res.status(500).json(err);
    }
});

//TIMELINE : contient tous les posts de ses amis + les siens 
//permettra de récuperer la TL de chaque utilisateur
router.get("/timeline/all", async (req, res)=>{
    try {
        
        const currentUser = await User.findById(req.body.userId);
        
        const userPosts = await Post.find({userId : currentUser._id});

        const followingPosts = await Promise.all( //Recuperes les posts pour chacun de ses abonnements
             currentUser.following.map((friendId) => {
                 return Post.find({ userId: friendId });
             })
         );
        res.status(200).json(userPosts.concat(...followingPosts))
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router