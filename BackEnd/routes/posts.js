const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Like Functionality
router.put("/likeBlog/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      res.json({ success: false, messagse: 'Cannot like your own post.' }); // Return error message
    } else {
      // Check if the user who liked the post has already liked the blog post before
      if (post.likedBy.includes(req.body.username)) {
        res.json({ success: false, message: 'You already liked this post.' }); // Return error message
      } else {
        // Check if user who liked post has previously disliked a post
        if (post.dislikedBy.includes(req.body.username)) {
          post.dislikes--; // Reduce the total number of dislikes
          const arrayIndex = post.dislikedBy.indexOf(req.body.username); // Get the index of the username in the array for removal
          post.dislikedBy.splice(arrayIndex, 1); // Remove user from array
          post.likes++; // Increment likes
        post.likedBy.push(req.body.username); // Add username to the array of likedBy array
          // Save blog post data
          post.save((err) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
            } else {
              res.json({ success: true,  }); // Return success message
            }
          });
        } else {
          post.likes++; // Increment likes
          post.likedBy.push(req.body.username); // Add liker's username into array of likedBy
          // Save blog post
          post.save((err) => {
            if (err) {
              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
            } else {
              res.json({ success: true, message: 'Blog liked!' }); // Return success message
            }
          });
        }
      }
    }
    } 
  catch (err) {
    res.status(500).json(err);
  }
});
//Dislike Functionality
router.put("/disLikeBlog/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      res.json({ success: false, messagse: 'Cannot dislike your own post.' }); // Return error message
    } else {
      // Check if user who disliked post has already disliked it before
      if (post.dislikedBy.includes(req.body.username)) {
        res.json({ success: false, message: 'You already disliked this post.' }); // Return error message
      } else {
        // Check if user has previous disliked this post
        if (post.likedBy.includes(req.body.username)) {
          post.likes--; // Decrease likes by one
          const arrayIndex = post.likedBy.indexOf(req.body.username); // Check where username is inside of the array
          post.likedBy.splice(arrayIndex, 1); // Remove username from index
          post.dislikes++; // Increase dislikeds by one
          post.dislikedBy.push(req.body.username); // Add username to list of dislikers
          // Save blog data
          post.save((err) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
            } else {
            }
          });
        } else {
          post.dislikes++; // Increase likes by one
          post.dislikedBy.push(req.body.username); // Add username to list of likers
          // Save blog data
          post.save((err) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
            } else {
              res.json({ success: true, message: 'Blog disliked!' }); // Return success message
            }
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;