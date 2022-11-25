const { MulterError } = require("multer");
const multer= require("multer");
function defaultErrorHandler(err,req,res,next){
    if(err){
        if(err instanceof multer.MulterError){
            res.json({
                error:'there was multer error'
            });
        }else{
            res.status(500).json({
                error:"there was server side error from DEH.",
                err:err.message,
                errors:{
                    msg:err.message
                }
            });
        }
    }
};
function notFound(req,res,next){
    res.status(404).send('Not Found!')
}

module.exports={defaultErrorHandler,notFound};