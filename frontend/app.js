import backendUrl from './config';
const loginForm = document.getElementById('login');

//before document.getElementById('login').action

if (loginForm) {
  loginForm.addEventListener('submit', submitForm);
}

function submitForm(event){
    event.preventDefault();
    var formData= new FormData(document.getElementById('login'));

    var xhttp=new XMLHttpRequest();
    xhttp.open('POST',backendUrl+'/api/users/login');
    xhttp.onload=function(){
        if(xhttp.status==200){
            console.log(JSON.parse(this.responseText), "123");
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
