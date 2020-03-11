const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const canvaSchema = new Schema({
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
                    description: String
                }
            ]
        }
    ]


    //Add here more info in the schema
}, {
    timestamps: true,
})

const Canva = mongoose.model("Canva", canvaSchema);

module.exports = Canva; 