const mongoose = require('mongoose');

const postSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            require:true,
        },
        content:{
            type:String,
            require:true,
        },
        title:{
            type:String,
            require:true,
            unique:true,
        },
        image:{
            type:String,
            default:'https://www.travelpayouts.com/blog/wp-content/uploads/2021/02/blog-images.png',
        },
        category:{
            type:String,
            default:'notcategorized'
        },
        slug:{
            type:String,
            require:true,
            unique:true,
        },
    },{timestamps:true}
);

const Post = mongoose.model('Post',postSchema);

module.exports=Post;