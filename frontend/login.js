document.addEventListener("DOMContentLoaded",function(){
    
    function submitForm(event){
        event.preventDefault();
        var formData= new FormData(document.getElementById('login'));

        var xhttp=new XMLHttpRequest();
        xhttp.open('POST',document.getElementById('login').action);
        xhttp.onload=function(){
            if(xhttp.status==200){
                //const response=this.getAllResponseHeaders();
                console.log(this.responseText);
                const jwt=this.responseText.token;
                console.log(jwt);
                token=localStorage.setItem('userToken', jwt);
                window.location.href='./tasks.html';
            }
            else{
                console.log(xhttp.statusText);  
            }
        };
        
        xhttp.send(formData);
    }
/*
    const token=localStorage.getItem('userToken');
    console.log(token);
    if(token!=null){
        const decodeToken=jwt_decode(token);
        const currTime=Date.now()/1000;
        if(decodeToken.exp>=currTime){
            localStorage.removeItem(token);
            document.getElementById('login').addEventListener('submit',submitForm);
        }
        else{
            window.alert('User already logged in');
        }        
    }
    else{
        document.getElementById('login').addEventListener('submit',submitForm);
    }
*/
document.getElementById('login').addEventListener('submit',submitForm);
})