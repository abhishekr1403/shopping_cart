const db = require('../config/connection')
const collection = require('../config/collections')
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
        
    }




}