


//! to create a post

const { prisma } = require("../prisma");


const createPost = async (req, res) => {
    try{
            const { title, body, slug, authorId } = req.body;
            console.table(req.body); 

            const post = await prisma.post
              .create({
                data: {
                  title,
                  body,
                  slug,
                  author: {
                    connect: {
                      id: authorId,
                    },
                  },
                },
              })
              .then((data) => {
                res
                  .status(201)
                  .json({ message: "Post created successfully", data });
              })
              .catch(console.log);
            console.log(post)
    }
    catch(err){}
}



const updatePost = async (req, res) => {
        const {id}=req.params;
        const {title,description, }=req.body;
    try{    
        const post = await prisma.post.update({
          where: {
            id
          },
          data: {
            title,
            description,
            slug,
          },
        });
        res.status(200).json({message:"Post updated successfully"},post);

    }
    catch(err){
        console.log(err);
        req.status(500).json({message:"post with "+id+" not found"});
    }
}


//! delete a post

const deletePost = async (req, res) => {
    const {id}=req.params;

    try{
        const post = await prisma.post.delete({
            where: {
              id
            },
          });
          res.status(200).json({message:"Post deleted successfully"},post);
    }
    catch(err){
        console.log(err);
        req.status(500).json({message:"post with "+id+" not found"});
    }
}

//! get all post

const getAllPost = async (req, res) => {
    console.log("get all post");

    try{
        const posts = await prisma.post.findMany()
        res.status(200).json(posts);
    }
    catch(err){
        console.log(err);
        req.status(500).json({message:"post with "+id+" not found"});
    }

}
 

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPost

}
