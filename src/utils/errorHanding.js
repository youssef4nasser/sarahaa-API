
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            return next(new Error(error))
        })
    }
}

export const globalErrorHandling = (error, req, res, next) => {
    let status = error.statusCode || 500
     process.env.MODE == "prod" ?
       res.status(status).json({ errMsg: error.message}) :
       res.status(status).json({ errMsg: error.message, stack: error.stack})
}