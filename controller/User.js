const userModel= require('../model/User')
const bcrypt = require('bcrypt')
exports.register = (data) =>
    new Promise ((resolve, reject)=>{
       //console.log({
         //   username : data.username
        //})
        userModel.findOne({
            username: data.username
        }).then(user => {
            if(user) {
                resolve({
                    status : false,
                    pesan: 'Sudah Ada'
                })
            }else{
                bcrypt.hash(data.password, 10 , (err, hash) => {
                  data.password = hash
                  //untuk insert data
                  userModel.create(data)
                    .then (()=>{
                        //console.log('Berhasil')
                        resolve({
                            status : true,
                            pesan : 'Berhasil'
                        })
                    }).catch(() =>{
                        //console.log('Gagal')
                        reject ({
                            status : false,
                            pesan : 'Gagal'
                        })
                    })   
                }) 
            }
        })
        
    })
    
exports.login = (data) =>
    new Promise ((resolve, reject)=>{
         userModel.findOne({
             username: data.username
         }).then(user => {
             if (user){
                 if(bcrypt.compareSync(data.password, user.password)){
                     resolve({
                         status : true,
                         pesan : 'Berhasil Login'
                     })   
                 }else{
                     reject({
                        status : false,
                        pesan : 'Password Tidak Sesuai'
                     })
                 }
            }else{
                reject({
                    status : false,
                    pesan : 'Username Tidak Terdaftar'
                })
            }
        })
    })