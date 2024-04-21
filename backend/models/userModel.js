const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
})


userSchema.statics.signup = async function (email, password) {
    const exists = await this.findOne({email})
    if (exists) {
        throw Error('email already in use')
    }

    const salt = await bcrypt.genSalt(10) //extra layer add to password for security 
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash}) //Add the email and hashed password to db'
    return user
}
module.exports = mongoose.model('User', userSchema)
