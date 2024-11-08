import express from "express";
import cors from "cors";
const app=express();
app.use(cors())

app.use(express.json({limit: "15kb"}))
app.use(express.urlencoded({extended:true,limit: "15kb"}))
app.use(express.static("public"));
 
app.get("/api/v1/health", function(req, res) {
    res.status(200).send("OK")
})

export {app};