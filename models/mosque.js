const mongoose = require("mongoose");

const mosqueSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true,
        },
        loction:{
            type: String,
            require: true,
        },
        
    }
)