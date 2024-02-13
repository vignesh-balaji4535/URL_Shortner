import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import shortid from "shortid";
import connectToMongoDB from "./Data_Base/db.js";
import { Shortner } from "./Modles/Shortner.js";
dotenv.config();



const App=express();

App.use(express.json());
App.use(cors())



App.post("/Api/url",async (req,res)=>{

    try {
        let newURL =  new  Shortner({
            longURL:req.body.longURL,
            shortURL:shortid.generate().slice(4),
        
        })

        await newURL.save();
        res.status(200).send("success !!!")

    } catch (error) {
        res.status(500).send(error)
    }
})


App.get("/All",async(req,res)=>{
    
    try {
        
        let allURL = await Shortner.find();



        return res.status(200).send(allURL)

        // res.redirect(allURL.longURL)
    } catch (error) {
        res.status(500).send(error)
    }

})



App.get("/:shortid",async(req,res)=>{
    
    let allURL;
    try {
        
         allURL = await Shortner.findOne({shortURL:req.params.shortid});

        allURL.clickCount=allURL.clickCount+1


       await allURL.save()


        res.redirect(allURL?.longURL)
    } catch (error) {
        res.status(500).send(error)
    }

})




connectToMongoDB()

App.listen(process.env.PORT,()=>{
    console.log("Server connected with the port :",process.env.PORT)
})
