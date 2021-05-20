const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const PORT=process.env.PORT || 5000;

const Aadhar=require('./models/Aadhar');

app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json({ extended: true, limit: '30mb' }));
app.use(cors());



const db = ''
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Something went wrong', err.message);
})


app.post('/checkaadhar',(req,res)=>{
    Aadhar.findOne({$or:[{aadhar:req.body.aadhar},{address:req.body.address}]}).then((voter)=>{
        if(voter)
            return res.status(200).json({msg:"REJECTED"});
        else{
            const newvoter=new Aadhar({
                aadhar:req.body.aadhar,
                address:req.body.address,
                castedto:req.body.castedto
            });

            newvoter.save().then(nvoter=>{
                console.log("Vote Polled");
                console.log(nvoter);
                return res.status(200).json({msg:"ACCEPTED"});
            }).catch(err=>{
                console.log(err.message);
            })
        }
    }).catch(err=>{
        console.log("MongoDB error:",err.message);
    })
})

app.get('/',(req,res)=>{
    return res.status(200).json({msg:"TEST WORKING"})
})

app.listen(PORT,()=>{
    console.log("SERVER LISTENING ",PORT);
})