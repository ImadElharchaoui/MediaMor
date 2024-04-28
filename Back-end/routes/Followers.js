import express from "express";
import { connection } from "../database.js";

const router = express.Router();

router.post('/followers', (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId in request body' });
    }

    connection.query("SELECT follower, timeMake FROM followers WHERE following = ?", [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            return res.status(200).json({ results });
        }
    });
});

router.post('/following', (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId in request body' });
    }

    connection.query("SELECT following, timeMake FROM followers WHERE follower = ?", [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            return res.status(200).json({ results });
        }
    });
});


router.post('/isfollow', (req, res) => {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
        return res.status(400).json({ message: 'Missing followerId or followingId in request body' });
    }

    connection.query('SELECT follower FROM followers WHERE follower = ? AND following = ?', [followerId, followingId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            return res.status(200).json({ isFollowing: results.length > 0 });
        }
    });
});

router.post('/create', (req, res) => {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
        return res.status(400).json({ message: 'Missing followerId or followingId in request body' });
    }

    connection.query('INSERT INTO followers (follower, following, timeMake) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE timeMake = NOW()', [followerId, followingId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            return res.status(200).json({ message: 'You followed this person' });
        }
    });
});

router.post('/delete', (req, res) => {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
        return res.status(400).json({ message: 'Missing followerId or followingId in request body' });
    }

    connection.query('DELETE FROM followers WHERE follower = ? AND following = ?', [followerId, followingId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            return res.status(200).json({ message: 'You unfollowed this person' });
        }
    });
});

export default router;
