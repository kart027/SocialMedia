const user = require("../models/user");

exports.userregister = async (req,res) =>{
    try {
            const {name,email,password} = req.body;

            let User = await user.findOne({email});

            if(User){
                res.status(400).json({
                    sucess:false,
                    message:"User alerdy exit"
                })
            }
              User = await user.create({
               name, email,password,
               avatar:{
                public_id:"sample_id",
                url:"sampleurl,"
               }
            })

            res.status(201).json({
                sucess: true,
                User
            })
 
    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:error.message
           
        })
        
    }
}

exports.login = async (req,res)=>{

    try{
        const{email,password} = req.body;

        const user = await user.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                sucess:false,
                message:"user does not exist"
            });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                sucess: false,
                message:"Incorrect Password",
            });
        }

        const token = await user.generateToken();
        const options = {expires:new Date(Date.now()+90*24*60*60*1000),httpOnly:true}

        res.status(200).cookie("token",token,options).json({
            sucess:true,
            user,
            token,
        })


    }catch (error) {
        res.status(500).json({
            sucess:false,
            message:error.message,
        })
    }

    

}


exports.followUser = async (req,res) =>{
    try {
        
        const usertoFollow = await user.findById(req.params.id);
        const loggedINuser = await user.findById(req.user._id );


            if(loggedINuser.following.includes(usertoFollow._id)){
                const index  = loggedINuser.following.indexOf(usertoFollow._id);
                loggedINuser.following.splice(index,1);

                const indexfollower = usertoFollow.followers.indexOf(loggedINuser._id);
                usertoFollow.followers.splice(indexfollower,1);

                await loggedINuser.save();
                await usertoFollow.save();
            }


        loggedINuser.following.push(usertoFollow._id);
        usertoFollow.followers.push(loggedINuser._id);

        await loggedINuser.save();
        await usertoFollow.save();

    } catch (error) {
        res.status(500).json({
            sucess:false 
        })
    }
} 