import express from 'express';
import multer from 'multer';
import { connection } from './database.js';
import path from 'path';

const router = express.Router();

router.use(express.static('./images'))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        cb(null, './images');
    },
    filename: function(req, file, cb) {
        const fileName = `${new Date().toISOString().replace(/:/g, "-")}_${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

router.post('/upload/:relation_id/:type', upload.single('file'), async (req, res) => {
    
    try {
        const { relation_id, type } = req.params;
        const filePath = req.file.path; // Multer stores the uploaded file's path in req.file.path
        
        let exist = 0;
        await connection.query('SELECT id FROM media WHERE relation_id = ? AND type = ?' , [relation_id, type], (err, results)=>{
            if(results.length > 0){
               exist  = results[0].id; 
            }
            
        })
        console.log('exist', exist)
        // Insert file metadata into the database
        if(exist == 0){
            const insertQuery = "INSERT INTO media (path, relation_id, type) VALUES (?, ?, ?)";
            await connection.query(insertQuery, [filePath, relation_id, type]);

            res.status(200).json({ message: 'Image uploaded successfully' });
        }else{
            await connection.query("UPDATE media SET path = ? WHERE relation_id = ? AND type =  ?" , [filePath, relation_id, type], (err, results) =>{
                if(err){
                    console.log(err)
                }else{
                    res.status(200).json({ message: 'Image ReUploaded successfully' });
                }
            })
        }
        
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;