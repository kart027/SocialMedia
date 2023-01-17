// const { post } = require("../app");
const post = require("../models/post");
const User = require("../models/user");


exports.createpost = async (req,res)=>{
        try {
           const newpostData = {
            caption:req.body.caption,
            image:{
                public_id:"public id",
                url:"newurl"
            
            },
            owner:req.user._id,
           };
            const newPost = await post.create(newpostData);
            const user = await User.findById(req.user._id);

            user.posts.push(newPost._id);

            await user.save();

            res.status(201).json({
                sucess:true,
                post:newpostData,
            })

        } catch (error) {
            res.status(500).json({
                sucess:false,
                message: error.message,
                        })
        }

}


exports.likedUnlikedpost = async(req,res)=>{
    try {
        
        const Post = await post.findById(req.params.id);
            if(!post){
                return res.status(404).json({
                    sucess:false,
                    message:"post not found"

                })
            }


      if(Post.includes(req.User._id)){
        const index = Post.likes.indexOf(req.User._id);

        Post.likes.splice(index,1);
        await post.save()

        return res.status(200).json({
            sucess:true,
            message:"Unliked"
        })
      }


      
      Post.likes.push(req.User._id);

      await  Post.save()

      return res.status(200).json({
        sucess:true,
        message:"liked"
      })


    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:error.message
        })
    }
}



exports.deletepost = async (req,res) =>{
    try {
        const deletepost = await post.findById(res.params.id);

        if(!deletepost){
            return res.status(404).json({
                sucess:true,
                message:"post not found"
            })
        }

        if(post.owner.toString() !=  req.User._id.toString()){
            return res.status(401).json({
                sucess:true,
                message:"unAuthorized"
            })
        }

        await post.remove()

        const userr = await User.findById(req.User._id);

        const index = User.post.indexOf(req.params.id);
        User.post.splice(index,1);
        await User.save();

        res.status(200).json({
            sucess:true,
            message:"post deleted"
        })

    } catch (error) {
        
    }

}


exports.getPostfollowing = async (req,res) =>{
    try {
        const user = await User.findById(req.User._id);

        const Post = await post.find 
    } catch (error) {
        
    }
}