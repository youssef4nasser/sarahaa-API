
export const validation = (schema) =>{
    return (req, res, next)=>{
        const allDataFromAllMethods = {...req.body, ...req.params}
        const {error}= schema.validate(allDataFromAllMethods, {abortEarly: false});
        if(!error){
            next()
        }else{
            return res.status(400).json({message: "validation Error", Error: error.details})
        }
    }
}