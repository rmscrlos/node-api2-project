// implement your posts router here
const express = require('express');
const posts = require('./posts-model');

const router = express.Router();

//get all posts
router.get('/api/posts', (req, res) => {
	posts.find().then(users => {
		res.status(200)
			.json(users)
			.catch(err => {
				res.status(500).json({
					message: 'The posts information could not be retrieved'
				});
			});
	});
});

// get post by id
router.get('/api/posts/:id', (req, res) => {
	posts
		.findById(req.params.id)
		.then(post => {
			post
				? res.status(200).json(post)
				: res.status(404).json({
						message: 'The post with the specified ID does not exist.'
				  });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'The post information could not be retrieved'
			});
		});
});

//create post
router.post('/api/posts', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: 'Please provide title and contents for the post.'
		});
	}

	posts
		.insert(req.body)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(err => {
			res.status(500).json({
				message: 'There was an error while saving the post to the database.'
			});
		});
});

// update post
router.put('/api/posts/:id', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: 'Please provide title and contents for the post'
		});
	}

	posts
		.update(req.params.id, req.body)
		.then(post => {
			post
				? res.status(200).json(post)
				: res.status(404).json({
						message: 'The post with the specified ID does not exist'
				  });
		})
		.catch(err => {
			res.status(500).json({
				message: 'The post information could not be modified.'
			});
		});
});

//delete post
router.delete('/api/posts/:id', (req, res) => {
	posts
		.remove(req.params.id)
		.then(post => {
			post
				? res.status(200).json(post)
				: res.status(404).json({
						message: 'The post with the specified ID does not exist.'
				  });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'The post could not be removed.'
			});
		});
});

//get post comments
router.get('/api/posts/:id/comments', (req, res) => {
	posts
		.findPostComments(req.params.id)
		.then(comments => {
			comments
				? res.status(200).json(comments)
				: res.status(404).json({
						message: 'The post with the specified ID does not exist.'
				  });
		})
		.catch(err => {
			res.status(500).json({
				message: 'The comments information could not be retrieved'
			});
		});
});

//find comment of post by id
router.get('/api/posts/:postID/comments/:commentID', (req, res) => {
	console.log(req.params.postID, req.params.commentID);

	posts
		.findCommentById(req.params.postID, req.params.commentID)
		.then(comment => {
			comment
				? res.status(200).json(comment)
				: res.status(404).json({
						message: 'The comment with the specified ID does not exist.'
				  });
		})
		.catch(err => {
			res.status(500).json({
				message: 'Could not get information about the comment.'
			});
		});
});

//add comment to post

module.exports = router;
