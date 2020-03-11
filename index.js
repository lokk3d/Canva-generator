const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let middleware = require('./routes/auth/middleware');
const path = require("path");


require("dotenv").config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err){
        console.log("Errore nella connessione al DB...");
        console.log(err)
    }
});
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Connessione al DB effettuata...");
})


//******************** ROUTERS *************************
const testRouter = require("./routes/test"); 
app.use("/api/test", testRouter);

const registerRouter = require("./routes/auth/register"); 
app.use("/api/signup", registerRouter);

const loginRouter = require("./routes/auth/login"); 
app.use("/api/login", loginRouter);

const adminRouter = require("./routes/auth/admin"); 
app.use("/api/admin",middleware.checkToken, adminRouter);

const userRouter = require("./routes/user"); 
app.use("/api/user", middleware.checkToken, userRouter);

const canvaRouter = require("./routes/canva"); 
app.use("/api/canvas", middleware.checkToken, canvaRouter);


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    
    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
    })
}

app.use("/public", express.static(path.join(__dirname, 'public')));

app.listen(port, ()=>{
    console.log('Server running... on port: ' + port);
})