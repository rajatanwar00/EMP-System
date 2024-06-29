const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

module.exports={
    async addRecords(){
        //await User.create();
        console.log("here");
        return new Promise(async(resolve, reject)=>{
            try {
               
                const fakeUsers=[];
                fs.createReadStream(path.join(__dirname, '../../../SocialMediaUsersDatasetDuplicate.csv'))
                .pipe(csv.parse({ headers: true,delimiter:',' }))
                .on('error', error => console.error(error))
                .on('data', async function(data) {
                //console.log(data);
                //var numericString = data.Phone1.replace(/\D/g, '');
                const newObject={
                    usertype:'employee',
                    username: String(data['Name']),
                    email:String(data.Country),
                    password: String(data.City),
                    //phonenumber: parseInt(numericString)
                    phonenumber: Number(data.UserID)
                }
                fakeUsers.push(newObject);
                //await User.create(newObject);
                
                })
                .on('end', async function(){
                //console.log(fakeUsers[0])
                setTimeout(()=>{
                  return resolve({data:fakeUsers})
                }, 0)
                
                });
                
            } catch (error) {
                reject({data: []})
            }
           
        })
        }
        
}


