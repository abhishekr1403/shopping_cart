const bcrypt = require('bcrypt')
const db = require('../config/connection')
const collection = require('../config/collections')

module.exports = {

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {

                resolve(userData)

            })
        })
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
            if (user) {
                bcrypt.compare(userData.Password, user.Password).then((done) => {
                    //console.log(done)
                    if (done) {
                        console.log('Login success')
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log('Login Failure')
                        resolve({ status: false })
                    }
                })
            } else {
                console.log('Username Not Found')
                resolve({ status: false })
            }
        })
    }
}   