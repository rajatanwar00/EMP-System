import backendUrl from './config.js';
//<script type="module">
          const { createApp } = Vue
        
          createApp({
            data(){     
              return {
                tasks: [],
                users:[],
                teams:[],
                membersarray:[],
                reportArray:[],
                totalpages:0,
                deluser:'',
                msg:"hello",
                taskslength:0,
                // userType:'employee',
                loading:false,
                newtask:{
                  task:'',
                  assignedTo:''
                },
                employeeTeam:{
                  name:'',
                  members:[]
                },
                newteam:{
                  name:'',
                  manager:''
                },
                displayTeam:{
                  name:''
                },
                addMember:{
                  teamname:'',
                  member:''
                },
                filterData:{
                  task:"",
                  status:"",
                  teamname:"",
                  cid:"",
                  ced:"",//new Date().toISOString().slice(0,10),
                  uid:"",
                  ued:"",//new Date().toISOString().slice(0,10),
                  limit:3,
                  pageno:1,
                  userType:'employee',
                },
                reportI:'',
                reportE:''
              };
            },
            methods:{
              tasksdisplay(){
                const token=localStorage.getItem('userToken');
                axios.get(`${backendUrl}/api/tasks?task=&&status=&&teamname=&&cid=&&ced=&&uid=&&ued=&&limit=3&&pageno=1&&userType=`+ this.filterData.userType,{headers:{token:`${token}`}})    
                .then((response)=>{
                  this.tasks = response.data.taskslist;
                  this.taskslength=response.data.totalRecords;
                  console.log({tasks:this.tasks,taskslength:this.taskslength});
                  this.pageNavigation();
                })
                .catch((error)=>{
                  console.log(error)
                });
              },
              completeTask(taskId,taskStatus){
                const token=localStorage.getItem('userToken')
                const object={
                  status:taskStatus,
                  taskid:taskId
                };
                axios.put(`${backendUrl}/api/users/tasks`,object,{headers:{token:`${token}`}})    
                .then((response)=>{
                                    
                })
                .catch((error)=>{
                  console.log(error)
                });              
              },
              addTask(){
                const usertype=localStorage.getItem('userType');
                const token=localStorage.getItem('userToken');
                const findTeam=this.teams.find((element)=>element.name==this.newtask.assignedTo);
    
                const postData={
                    task:this.newtask.task,
                    assignedToId: findTeam.id
                };
                axios.post(`${backendUrl}/api/users/tasks`,postData,{headers:{token:`${token}`}})
                .then((response)=>{
                    this.tasks.push(response.data);
                })
                .catch(function(error){
                    console.log(error);
                })
              },
              deleteUser(){
                const returnvalue=prompt("Type 'Delete' to confirm your action");
                if(returnvalue=='Delete'){
                  const findUser=this.users.find((element)=>element.username==this.deluser);
                  const token=localStorage.getItem('userToken');
                  axios.delete(`${backendUrl}/api/users/`,{userid:findUser.id},{headers:{token:`${token}`}})
                  .then((response)=>{
                      location.reload();
                  })
                }
                
              },
              onApplyFilter(){
                this.filterData.pageno=1;
                this.loadTasks();
              },
              loadTasks(){
                this.loading=true;
                const token=localStorage.getItem('userToken');
                axios.get(`${backendUrl}/api/tasks`,{headers:{token:`${token}`},params:this.filterData})
                .then((response)=>{
                  console.log(response.data);
                  this.tasks=response.data.taskslist;
                  this.taskslength=response.data.totalRecords;
                  this.pageNavigation();
                })
                this.loading=false;
              },              
              incpageno(){
                this.filterData.pageno++;
                console.log(this.filterData.pageno);
                const ceil=Math.ceil((this.taskslength)/(this.filterData.limit));
                console.log({taskslength:this.taskslength});
                console.log({ceil:Math.ceil((this.taskslength)/(this.filterData.limit))});
                if(this.filterData.pageno>ceil){
                  this.filterData.pageno=ceil;
                }
                else{
                  if(this.loading==false)
                  this.loadTasks();
                }
                //console.log(this.filterData.pageno);
                
              },
              decpageno(){
                this.filterData.pageno--;
                if(this.filterData.pageno<1){
                  this.filterData.pageno=1;
                }
                else{
                  if(this.loading==false)
                  this.loadTasks();
                }
              },
              pageNavigation(){
                this.totalpages=Math.ceil((this.taskslength)/(this.filterData.limit));

              },
              pagecall(pageindex){
                this.filterData.pageno=pageindex+1;
                console.log(this.filterData.pageno);
                this.loadTasks();
              },
              resetForm(){
                this.filterData.task='';
                this.filterData.status='';
                this.filterData.cid='';
                this.filterData.ced='';
                this.filterData.uid='';
                this.filterData.ued='';
              },
              openForm(){
                document.getElementById("taskAssignFormAdmin").style.display = "block";
              },
              openTeam(){
                document.getElementById("newTeamForm").style.display = "block";
              },
              closeForm(){
                document.getElementById("taskAssignFormAdmin").style.display = "none";
              },
              closeTeam(){
                document.getElementById("newTeamForm").style.display = "none";
              },
              getUsers(){
                const usertype=localStorage.getItem('userType');
                const token=localStorage.getItem('userToken');

                if(usertype=='employee'){
                  axios.get(`${backendUrl}/api/users/find`,{headers:{token:`${token}`}})
                  .then((response)=>{
                    //console.log(response);
                    this.users.push(response.data);
                  })
                  
                }
                else
                axios.get(`${backendUrl}/api/users`,)
                .then((response)=>{
                  this.users=response.data;
                })
              },
              logout(){
                localStorage.clear();
                window.location.href='./login.html';
              },
              report(){
                const token=localStorage.getItem('userToken');
                const reportObject={
                  uid:this.reportI,
                  ued: this.reportE,
                  userType: 'admin'
                }
                axios.get(`${backendUrl}/api/tasks`,{headers:{token:`${token}`},params:reportObject})
                .then((response)=>{
                  console.log(response.data);
                  this.reportArray=response.data;
                })
              },
              sortTable(){
                let table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById("report-table");
                switching = true;

                while (switching) {
                  switching = false;
                  rows = table.rows;

                  for (i = 1; i < rows.length - 1; i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("td")[0];
                    y = rows[i + 1].getElementsByTagName("td")[0];

                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                      shouldSwitch = true;
                      break;
                    }
                  }

                  if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                  }
                }
              },
              newTeam(){
                const teamObject={
                  name:this.newteam.name,
                  manager:this.newteam.manager
                };
                const token=localStorage.getItem('userToken');
                axios.post(`${backendUrl}/api/teams`,teamObject,{headers:{token:`${token}`}})
                .then((response)=>{
                  console.log({teampost:response.data});
                  this.teams.push(response.data);
                })
              },
              getTeams(){
                const token=localStorage.getItem('userToken');
                //console.log(token);
                axios.get(`${backendUrl}/api/teams`,{headers:{token:`${token}`}})
                .then((response)=>{
                  this.teams=response.data;
                })
              },
              openDelete(){
                document.getElementById("OuterDeleteDiv").style.display="block";
              },
              closeDelete(){
                document.getElementById("OuterDeleteDiv").style.display="none";
              },
              addMemberToTeam(){
                let response= prompt("Adding member to a team removes it from previous team(if exist).\n Are you sure about your action?\n Type 'Confirm' to continue");
                if(response!='Confirm'){
                  return;
                }
                console.log({team:this.teams[1]});
                const check=this.teams.find((element)=>element.manager.username==this.addMember.member);
                if(check){
                  alert("Cannot change Team Member!!");
                  return ;
                }
                const token=localStorage.getItem('userToken');
                const findTeam=this.teams.find((element)=>element.name==this.addMember.teamname);
                const addObject={
                  team:findTeam.id,
                  username:this.addMember.member
                }
                axios.put(`${backendUrl}/api/users`,addObject,{headers:{token:`${token}`}})
                .then((response)=>{
                  console.log(response);
                })
              },
              displayMembers(){
                const token=localStorage.getItem('userToken');
                axios.get(`${backendUrl}/api/teams/members/` + this.displayTeam.name+'/admin',{headers:{token:`${token}`}})
                .then((response)=>{
                  this.membersarray=response.data;
                })
              },
              displayTeamEmp(){
                const usertype=localStorage.getItem('userType');
                if(usertype=='admin'){
                  return;
                }
                
                const token=localStorage.getItem('userToken');
                axios.get(`${backendUrl}/api/users/find`,{headers:{token:`${token}`}})
                .then((response)=>{
                  //console.log(response,response.data,1234567890);
                  const user=response.data;
                  if(!user.team){
                    return;
                  }
                  
                  axios.get(`${backendUrl}/api/teams/members/`+user.team.id,{headers:{token:`${token}`}})
                  .then((response)=>{
                    //console.log(response);
                    this.employeeTeam.name=response.data.name;
                    this.employeeTeam.members=response.data.members;
                  })
                })    
              },
              deleteTask(taskid){
                const returnvalue=prompt("Type 'Delete' to confirm your action");
                if(returnvalue=='Delete'){
                  const token=localStorage.getItem('userToken');
                  axios.delete(`${backendUrl}/api/users/tasks/`+taskid,{headers:{token:`${token}`}})
                  .then((response)=>{
                      
                  })
                }
              }
            },
            created(){
              this.filterData.userType=localStorage.getItem('userType');
              this.getTeams();
              this.tasksdisplay();
              this.getUsers();
              //this.sortTable();
              this.displayTeamEmp();
            }
          }).mount('#usertypeDiv')
       
        //</script>