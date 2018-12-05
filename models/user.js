const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

// Create a schema
/// Double check email && pw is required
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

// f(n) that runs before saving schema
/// Don't use fat arrow function to use this
userSchema.pre('save', async function (next) {
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt);
        console.log('Salt: ', salt)
        // Reassign password to hash
        this.password = passwordHash;
        // Next middleware
        next();
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

// Create a model
const User = mongoose.model('user', userSchema)

// Export the model
module.exports = User;