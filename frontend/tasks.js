import backendUrl from './config.js';
document.addEventListener("DOMContentLoaded",function(){
    const token=localStorage.getItem('userToken');
    console.log(token);
    
    axios.get(`${backendUrl}/api/users/tasks`,{headers:{Authorization:`Bearer ${token}`}})    
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })

})