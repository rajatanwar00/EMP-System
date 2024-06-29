
const loginForm = document.getElementById('login');

if (loginForm) {
  loginForm.addEventListener('submit', submitForm);
}

//document.getElementById('login').addEventListener('submit',submitForm);


function submitForm(event){
    event.preventDefault();
    var formData= new FormData(document.getElementById('login'));

    var xhttp=new XMLHttpRequest();
    xhttp.open('POST',document.getElementById('login').action);
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

// function updatetask(Taskid){
//     console.log("at update");
//     const updateData={
//         taskId:Taskid
//     };
//     debugger
//     const token=localStorage.getItem('userToken');
//     axios.put('http://localhost:1337/api/users/tasks/update',updateData,{headers:{token:`${token}`}})
//     .then(function(response){
//         document.getElementById(Taskid).parentNode.parentNode.innerHTML=`Your Task: ${response.data.task}<br>
//                                                                 Task Status: ${response.data.status}<br>`;
//     })
// }

// function tasksdisplay(){
//     //console.log("here");
//     token=localStorage.getItem('userToken');
//     console.log({"tokenintasksdisplay":token});
    
//     axios.get('http://localhost:1337/api/users/tasks',{headers:{token:`${token}`}})    
//     .then(function(response){
//         console.log(response);
//         //const alltasks=response.data;
//         const parentdiv=document.getElementById('tasksdiv');
//         for(var i=0;i<response.data.length;i++){
//             const newdiv=document.createElement("div");
//             newdiv.setAttribute("class","tasksarray");
//             //newdiv.setAttribute("id",`${response.data[i].id}`);
//             newdiv.innerHTML=`<div>Your Task: ${response.data[i].task}<br>
//                                  Task Status: ${response.data[i].status}<br></div>
//                                  <div><button class="complete_button" id="${response.data[i].id}">Completed</button></div>`;
//             parentdiv.appendChild(newdiv);
//             //console.log(response.data[i].id);
//             const btn=document.getElementById(response.data[i].id);
//             //if(btn)
//             const tid=response.data[i].id;
//             btn.addEventListener('click',updatetask(tid));
//         }
        
//     })
//     .catch(function(error){
//         console.log(error);
//     })
//     //console.log();
// }




// function addtask(){
//     const task=prompt("Add new task");
//     token=localStorage.getItem('userToken');
//     console.log(token);
    
//     const postData={
//         post:`${task}`,
//         status: "pending"
//     };
//     axios.post('http://localhost:1337/api/users/tasks',postData,{headers:{token:`${token}`}})
//     .then(function(response){
//         console.log(response);
//         const parentdiv=document.getElementById('tasksdiv');
//         const newdiv=document.createElement("div");
//         newdiv.setAttribute("class","tasksarray");    
//         //newdiv.setAttribute("id",`${response.data.id}`);
//         newdiv.innerHTML=`<div>Your Task: ${response.data.task}<br>
//                                  Task Status: ${response.data.status}<br><div>
//                                  <div><button class="complete_button" id="id-${response.data.id}">Completed</button></div>`;
//             parentdiv.appendChild(newdiv);
//     })
//     .catch(function(error){
//         console.log(error);
//     })
// }

// function deluser(){
//     token=localStorage.getItem('userToken');
//     axios.delete('http://localhost:1337/api/users/',{headers:{token:`${token}`}})
//     .then(function(response){
//         window.location.href='./index.html';
//     })
// }




// const tasks = document.getElementById('loadtasks');
// if (tasks) {
//   tasks.addEventListener('click', tasksdisplay);
// }

// const newtask=document.getElementById('newtask');
// if(newtask){
//     newtask.addEventListener('click', addtask);
// }

// const deleteuser=document.getElementById('deleteuser');
// if(deleteuser){
//     deleteuser.addEventListener('click', deluser);
// }


