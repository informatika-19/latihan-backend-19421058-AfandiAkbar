const kegiatanModel = require ('../model/Kegiatan')
const ObjectId = require('mongoose').Types.ObjectId

exports.create = (data) =>
  new Promise((resolve, reject)=>{
    //fungsi untuk menyimpan kegiatan
    kegiatanModel.create(data)
    .then(() => resolve({
        status: true,
        pesan: 'Berhasil Input Kegiatan'
    })).catch (() => reject({
        status: false,
        pesan: 'Gagal Input Kegiatan'
    }))

  })

//menemukan semua data
exports.showAllData = () =>
  new Promise((resolve, reject) => {
    kegiatanModel.find()
    .then(res => {
      resolve({
        status: true,
        pesan:'Berhasil Menampilkan Data',
        data: result
      })
    }).catch (() => reject({
      status: false,
      pesan: 'Gagal Menampilkan Data',
      data: null
    }))
  })

//menemukan satu data
exports.showDataById = (id) =>
  new Promise((resolve, reject) => {
    kegiatanModel.findOne()
      _id: ObjectId(id)
      }).then(result => {
        resolve({
          status: true,
          pesan:'Berhasil Menampilkan Data',
          data: result
        })
      }).catch (() => reject({
        status: false,
        pesan: 'Gagal Menampilkan Data',
        data: []
      }))

exports.update = (id, data)=>
  new Promise((resolve, reject)=>{
    kegiatanModel.updateOne({
      _id: objectid(id)
    }, data).then (() => resolve({
        status : true,
        pesan : 'berhasil update data',
      })).catch(()=> reject ({
      status : false,
      pesan : 'gagal update data',
    }))
  })

exports.delete = (id) =>
  new Promise((resolve, reject)=>{
    kegiatanModel.deleteOne({
      _id: objectid(id)
    }).then (() => resolve({
      status : true,
      pesan : 'berhasil delete data',
      })).catch(()=> reject ({
      status : false,
      pesan : 'gagal delete data',
      }))
  })
