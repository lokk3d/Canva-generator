const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const componentSchema = new Schema({
        title: String
},{_id:false})

const templateSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    components:[componentSchema]

    //Add here more info in the schema
})

const Template = mongoose.model("Template", templateSchema);

module.exports = Template; 