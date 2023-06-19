const express = require("express");
const app = express();
const cors= require("cors");
const predictRoute = require('./predictRoute')
const dataRoute=require('./dataRoute')
app.use(cors());
app.use(express.json());
app.use("/predict",predictRoute);
app.use("/fetchdata",dataRoute);

if(process.env.NODE_ENV==='production'){
    const path=require('path');
    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dir,'client','build')));
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(5000, () => {
    console.log("backend running")
});

  