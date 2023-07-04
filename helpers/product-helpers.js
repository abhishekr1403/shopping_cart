const db = require('../config/connection')

module.exports={

    addProduct: (product,callback)=>{
        console.log(product)

        db.get().collection('Product').insertOne(product).then((data)=>{


            callback(product._id)
        })
}
}