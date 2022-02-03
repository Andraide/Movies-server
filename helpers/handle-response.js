module.exports = handleResponse; 


//Just an example of status codes
function handleResponse(response) {
    try 
    {
        if (!response.ok) {
            if (response.status === 429) {
            } else if (response.status === 403) {
            } else {
            }
            throw response.status;
        }
    }
    catch(err)
    {
        throw err
    }
    
}