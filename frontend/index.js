//const axios=require('axios');
import backendUrl from './config';

document.addEventListener("DOMContentLoaded",function(){
    axios.get(`${backendUrl}/api/users/`)
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



