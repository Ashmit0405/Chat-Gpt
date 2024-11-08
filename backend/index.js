import dotenv from "dotenv"
import connectDB from "./db/connectdb.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

const port=process.env.PORT||3000
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`listening at http://localhost:${port}`);
    })
})
.catch((error)=>{
    console.log("Connection error: ",error);
})