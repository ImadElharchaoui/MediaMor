import express from 'express'
import { PORT } from "./config.js"
import cors from 'cors'


//All routers
import userRoute from './routes/Users.js'
import postRoute from './routes/Post.js'
import commentRoute from './routes/Comment.js'
import ImageRoute from './ImagesSystem.js'
import followerRoute from './routes/Followers.js'



//midlleware
const app = express();
app.use(cors());

app.use(express.json());

//images path static

app.use('/images', express.static("C:\Users\ULTRAPC\Desktop\Projects\fullStackApps\MediaMor\Back-end\images"))




//routes

app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/comment', commentRoute)
app.use('/images', ImageRoute)
app.use('/follower',followerRoute)


app.listen(PORT, ()=> {
    console.log(`App is listening to port : ${PORT}`);
})