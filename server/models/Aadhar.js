const mongoose=require('mongoose');

const AadharSchema=new mongoose.Schema({
    aadhar:{
        type:String,
        require:true
    },
    address:{
        type:String,
        requrie:true
    },
    castedto:{
        type:String,
        require:true
    },
    castedAt:{
        type:String,
        default:Date.now()
    }
})

module.exports=Aadhar=mongoose.model('aadhar',AadharSchema);