module.exports = errorHandler;

async function errorHandler(err, ctx) {
   
    console.log("Error ====>!!", err)

    /*if (typeof (err) === 'string') {
       
        console.log(err)
        
    }*/

    
    ctx.status = err
}