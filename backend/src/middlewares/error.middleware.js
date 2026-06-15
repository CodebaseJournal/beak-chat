const errorMiddleware = (err,req,res,next) => {
    try{
        let error = {... err};
        error.message = err.message;
        console.error(err)

        const statusCode = error.statusCode || 500;
        const clientMessage =
            statusCode >= 500 ? "Server Error" : (error.message || "Request Error");
        res.status(statusCode).json({ success: false, error: clientMessage });

        //Mongoose Errors (duplicate Key, validation, bad Object ID)
    }catch(error){
        next(error)
    }
}

export default errorMiddleware