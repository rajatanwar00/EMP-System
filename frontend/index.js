//const axios=require('axios');

document.addEventListener("DOMContentLoaded",function(){
    axios.get('http://localhost:1337/api/users/')
    .then(function(response){
        const disdiv=document.getElementById('userdisplay');
        for(var i=0;i<response.data.length;i++){
            const newdiv=document.createElement("div");
            newdiv.setAttribute("class","usersarray");
            newdiv.innerHTML=`<p>User-name: ${response.data[i].username}<br>
                                User-email: ${response.data[i].email}<br>
                                User-phonenumber${response.data[i].phonenumber}<br><p>`
            //disdiv.style.border="1px solid black";

            disdiv.appendChild(newdiv);
        }
        
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })
});



