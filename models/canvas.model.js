const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const canvasSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    components:[
        {
            title: String,
            items: [
                {
                    title: String,
                    description: String,
                    bgColor:String
                }
            ]
        }
    ]


    //Add here more info in the schema
}, {
    timestamps: true,
})

const Canvas = mongoose.model("Canvas", canvasSchema);

module.exports = Canvas; 