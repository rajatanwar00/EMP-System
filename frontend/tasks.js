document.addEventListener("DOMContentLoaded",function(){
    const token=localStorage.getItem('userToken');
    console.log(token);
    
    axios.get('http://localhost:1337/api/users/tasks',{headers:{Authorization:`Bearer ${token}`}})    
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })

})