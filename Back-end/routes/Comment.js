import express from "express";
import { connection } from '../database.js';

const router = express.Router();

router.get('/commentpost/:id', (req, res) => {
    const postId = req.params.id;

    if (postId != null) {
        connection.query('SELECT id FROM comments WHERE post_id = ?', [postId], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error fetching comment IDs' });
            } else {
    
                res.status(200).json({ IDs: results });
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid post ID' });
    }
});

router.get('/:id', (req, res) => {
    const commentId = req.params.id;
    if (commentId) {
        let commentData = {};
        connection.query("SELECT * FROM comments WHERE id = ?", [commentId], (err, results) => {
            if (err) {
                console.error(err);
                res.status(400).json({ error: 'Error fetching comment details' });
            } else {
                if (results.length > 0) {
                    commentData = {
                        commentText: results[0].text,
                        commentTimeMake: results[0].timeMake,
                        commentTimeRemake: results[0].timeRemake,
                        UserId: results[0].user_id
                    };
                    // Fetch number of likes for the comment
                    connection.query('SELECT COUNT(user_id) as Nlikes FROM likes WHERE relation_id = ? AND type = ?', [commentId, 2], (err, results) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'Error fetching number of likes for the comment' });
                        } else {
                            if (results.length > 0) {
                                commentData = {
                                    ...commentData,
                                    Nlikes: results[0].Nlikes
                                };
                                res.status(200).json(commentData);
                            } else {
                                res.status(404).json({ error: 'No likes found for the comment' });
                            }
                        }
                    });
                } else {
                    res.status(404).json({ error: 'Comment not found' });
                }
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid comment ID' });
    }
});


router.post("/create" , (req, res)=> {
    const { text, userId, postId } = req.body;

    if(text != null && userId != null && postId !=null){
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        connection.query('INSERT INTO comments (text, timeMake, timeRemake, user_id, post_id) VALUES (?, ?, ?, ?, ?)' , [text, currentTime, currentTime, userId, postId] , (err, results) =>{
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                res.status(200).send({message: "comment created"})
            }
        })
    }
})

export default router;
