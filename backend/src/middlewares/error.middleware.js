const errorMiddleware = (err,req,res,next) => {
    try{
        let error = {... err};
        error.message = err.message;
        console.error(err)

        res.status(error.statusCode || 500).json({success:false,error:error.message || "Server Error" })

        //Mongoose Errors (duplicate Key, validation, bad Object ID)
    }catch(error){
        next(error)
    }
}

export default errorMiddleware