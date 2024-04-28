import express from "express";
import { connection } from '../database.js';

const router = express.Router();

router.post('/create', (req, res) => {
    const { text, userid } = req.body;

    if (userid != null) {
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        connection.query("INSERT INTO posts (text, timeMake, timeRemake, user_id) VALUES (?, ?, ?, ?)", [text, currentTime, currentTime, userid], (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                // Extract the ID of the inserted post from the results
                const postId = results.insertId;
                res.status(200).json({ id: postId });
            }
            });
            } else {
        res.status(500).send('error');
    }
});

router.get('/:postid', (req, res) => {
    const postid = req.params.postid;

    if (postid != null) {
        let postdata = {};
        // post details
        connection.query('SELECT * FROM posts WHERE id = ?', [postid], (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                if (results.length > 0) {
                    console.log(postid);
                    postdata = {
                        ...postdata,
                        postText: results[0].text,
                        PostTimeMake: results[0].timeMake,
                        PostTimeRemake: results[0].timeRemake,
                        userid: results[0].user_id
                    };

                    // post like count
                    connection.query('SELECT COUNT(user_id) as Nlikes FROM likes WHERE relation_id = ? AND type = ?', [postid, 1], (err, results) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        } else {
                            if (results.length > 0) {
                                console.log(postid);
                                postdata = {
                                    ...postdata,
                                    Nlikes: results[0].Nlikes
                                };

                                // post comment count
                    connection.query('SELECT COUNT(user_id) as Ncomments FROM comments WHERE post_id = ?', [postid], (err, results) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        } else {
                            if (results.length > 0) {
                                console.log(postid);
                                postdata = {
                                    ...postdata,
                                    Ncomments: results[0].Ncomments
                                };
                                res.status(200).send(postdata);
                            } else {
                                console.log('results:', results);
                                res.status(400).send(results);
                            }
                        }
                    });
                } else {
                    console.log('results:', results);
                    res.status(400).send(results);
                }
                }
                    });
                } else {
                    console.log('results:', results);
                    res.status(400).send(results);
                }
            }
        });
    } else {
        console.log('postid is null', postid);
        res.status(500).send(postid);
    }
});



export default router;
