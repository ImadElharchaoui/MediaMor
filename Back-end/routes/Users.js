import express from "express";
import { connection } from '../database.js';
import bcrypt from 'bcrypt'

const router = express.Router();

router.post("/create", async(req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).send("Fill the empty slots");
    }

    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const hatshedPassword = await bcrypt.hash(password, 10)
    connection.query("INSERT INTO users (username, password, email, timemake) VALUES (?, ?, ?, ?)",
        [username, hatshedPassword, email, currentTime], (err, results) => {
            if (err) {
                console.error("Error in database:", err);
                res.status(500).send("Error in database");
            }
            
            res.status(201).send("User created");
        });
});

router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send("Fill the empty slots");
    }
    
    connection.query("SELECT id,password FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error("Error in database:", err);
            res.status(500).send("Error in database");
        }
        if (results.length > 0) {

            const userid = results[0].id;
            const basepassword = results[0].password;
            const matchpassword = bcrypt.compare(password, basepassword)
            
            console.log(userid);
            if(matchpassword){
                res.status(200).json({ userid });
            }
            else{
                res.status(200).json({ userid: -1 });
            }
        } else {
            res.status(200).json({ userid: -1 });
        }
    });
});

router.post("/getImage" , (req, res) =>{
    const {sessionId, type} = req.body;
    
    if(sessionId ==-1){
        res.status(200).json({Imagepath:-1});
    }

    if(sessionId != null & type !=null){
        connection.query('SELECT path FROM media WHERE relation_id = ? AND type = ?' , [sessionId, type] , (err, results) =>{
            if(err){
                console.log("Error in database : " , err);
                res.status(500).send(err);

            }else if(results.length>0){
                const Imagepath = "http://localhost:5555/"+results[0].path;


                res.status(200).json({ Imagepath });
            }else{
                res.status(200).json({Imagepath:-1});
            }
        })
    }
})

router.post("/getusername", (req, res)=> {
    const { sessionId } = req.body;
    if(sessionId == -1){
        return res.status(200).json({ username: -1 });
    }
    if(sessionId != null){
        connection.query("SELECT username FROM users WHERE id = ?" , [sessionId], (err, results) => {
            if(err){
                console.log("Error in database:", err);
                return res.status(500).send("Error in database");
            }
            if(results.length > 0){
                const username = results[0].username;
                return res.status(200).json({ username });
            }else{
                return res.status(200).json({ username: -1 });
            }
        })
    }else{
        // Handle the case where sessionId is null
    }
})

router.get("/:id", (req, res) =>{
    const userid = req.params.id
    
    if(userid !=null){
        connection.query('SELECT * FROM users WHERE id = ?', [userid], (err, results)=>{
            if(err){
                console.log(err)
                res.status(500).send("err",err)
            }else{
                res.status(200).send({ results })
            }
        })
    }
})



router.get("/info/:id", (req, res) =>{
    const userid = req.params.id
    let info = {}
    if(userid !=null){
        connection.query('SELECT username,bio,timemake FROM users WHERE id = ?', [userid], (err, results)=>{
            if(err){
                console.log(err)
                res.status(500).send("err",err)
            }else{
                info = {
                    ...info,
                    username: results[0].username,
                    bio: results[0].bio,
                    time: results[0].timemake
                }
            }

        })

        connection.query('SELECT COUNT(id) as Nposts FROM posts WHERE user_id = ?', [userid], (err, results)=>{
            if(err){
                console.log(err)
                res.status(500).send("err", err)
            }else{
                info ={
                    ...info,
                    Nposts: results[0].Nposts
                }
            }

        })
        connection.query('SELECT COUNT(id) as Ncomments FROM comments WHERE user_id = ?', [userid], (err, results)=>{
            if(err){
                console.log(err)
                res.status(500).send("err", err)
            }else{
                info ={
                    ...info,
                    Ncomments: results[0].Ncomments
                }
            }

        })

        connection.query('SELECT COUNT(following) as Nfollowing FROM followers WHERE following = ?', [userid], (err, results)=>{
            if(err){
                console.log(err)
                res.status(500).send("err", err)
            }else{
                info ={
                    ...info,
                    Nfollowing: results[0].Nfollowing
                }
            }

        })

        connection.query('SELECT COUNT(follower) as Nfollowers FROM followers WHERE follower = ?', [userid], (err, results)=>{
            if(err){
                console.log(err)
                res.status(500).send("err", err)
            }else{
                info ={
                    ...info,
                    Nfollowers: results[0].Nfollowers
                }
                res.status(200).json({info})
            }

        })


        

        
    }
})


router.get("/posts/:id", (req, res) =>{
    const userId = req.params.id;

    if(userId!=null){
        connection.query("SELECT id FROM posts WHERE user_id = ?" , [userId] , (err, results) =>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }else{
                res.status(200).json({id:results})
            }
        })
    }

})




export default router;
