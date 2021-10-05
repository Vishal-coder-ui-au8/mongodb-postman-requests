const express = require("express");
const router = express.Router();
const Api = require("../models/api");

//get request
router.get("/", (req, res,next) => {
    Api.find()
    .then(data=>{
        res.status(200).json({
            apiData:data
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

//get request data by id:
router.get("/:id",(req,res,next)=>{
    console.log(req.params.id);
    Api.findById(req.params.id)
    .then(data=>{
        res.status(200).json({
            api:data
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            erro:err
        })
    })
})

//post request
router.post("/", (req, res,next) => {
    //console.log(req.body);

    const api = new Api({
        //_id:new Mongoose.Types.ObjectId,
        time: req.body.time,
        temp: req.body.temp  
    });

    api.save()
       .then(data => {
           console.log(data);
           res.status(200).json({
               newApi:data
           });
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error:err
           })
       });
});

//delete request
router.delete("/:id",(req,res,next)=>{
    //can use deleteOne deleteMany instead of remove due to deprecated
    Api.deleteOne({_id:req.params.id})
    .then(data=>{
        res.status(200).json({
            message:"deleted",
            result:data
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//put request
router.put("/:id",(req,res,next)=>{
    console.log(req.params.id);
    Api.findOneAndUpdate({_id:req.params.id},{
        $set:{
            time:req.body.time,
            temp:req.body.temp
        }
    })
    .then(data=>{
        res.status(200).json({
            updated_data:data
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;