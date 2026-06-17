export const errorMiddleware = (err,req,res,next) => {
        
        const statusCode = err.statusCode ?? (res.statusCode !== 200 ? res.statusCode : 500);
        
        console.error(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${err.message}`);
        
        const isDev = process.env.NODE_ENV === 'development';

        return res.status(statusCode).json({
            success: false,
            message: err.message,
            ...(isDev && { stack: err.stack }),
        })
}

export const notFound = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.statusCode = 404;
    next(err);
};
