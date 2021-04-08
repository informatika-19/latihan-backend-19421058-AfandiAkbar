const userModel= require('../model/User')
const bcrypt = require('bcrypt')
exports.register = (data) =>
    new Promise ((resolve, reject)=>{
        userModel.findOne({
            uname: data.uname
        }).then(user => {
            if(user) {
                resolve({
                    status : false,
                    pesan: 'Sudah Ada'
                })
            }else{
                bcrypt.hash(data.password, 10 , (err, hash) => {
                  data.password = hash
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