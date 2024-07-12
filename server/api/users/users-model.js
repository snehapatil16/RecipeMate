import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema ({
    name: [{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    }],
    username: {type: String, unique: true}, 
    email: {type: String, unique: true},
})
const User = mongoose.model('User', UserSchema);
export {User};