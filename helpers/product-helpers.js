const db = require('../config/connection')
const collection = require('../config/collections')
const { response } = require('../app')
const objectId = require('mongodb').ObjectID

module.exports={

    addProduct: (product,callback)=>{
        console.log(product)

        db.get().collection('Product').insertOne(product).then((data)=>{


            callback(product._id)
        })
    },

    getAllProducts: ()=>{
        return new Promise(async (resolve,reject)=>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
        
    },

    deleteProduct: (proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((done)=>{
                resolve(done)
            })
        })
    },

    getProductDetails: (proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
            
    },

    updateProduct: (proId,ProDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},{
                $set:{
                    Name:ProDetails.Name,
                    Category:ProDetails.Category,
                    Description:ProDetails.Description,
                    Price:ProDetails.Price
                }
            }).then((response)=>{
                resolve()
            })
        })
    }




}