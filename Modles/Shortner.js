import mongoose from "mongoose";


const shortnerSchema = new mongoose.Schema({

longURL:{
        type:String,
        required:true

    },
shortURL:{
        type:String,
        unique:true,

    },
clickCount:{
    type:Number,
    default:0

}

})


const Shortner = mongoose.model("Shotner",shortnerSchema)

export {Shortner} 