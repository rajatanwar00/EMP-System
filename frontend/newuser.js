import backendUrl from './config.js';
//before document.getElementById('userform').action
document.addEventListener("DOMContentLoaded",function(){
    function submitForm(event){
        event.preventDefault();
        var formData= new FormData(document.getElementById('userform'));

        var xhttp=new XMLHttpRequest();
        xhttp.open('POST',backendUrl+'/api/users');
        xhttp.onload=function(){
            if(xhttp.status=='200'){
                const jwt=JSON.parse(this.responseText).token;
                const usrtype=JSON.parse(this.responseText).usertype;
                localStorage.setItem('userType',usrtype);
                token=localStorage.setItem('userToken', jwt);
                window.location.href='./dashboard.html';
            }
            else{
                console.log(xhttp.statusText);
            }
        };
        
        xhttp.send(formData);
    }

    document.getElementById('userform').addEventListener('submit',submitForm);
})