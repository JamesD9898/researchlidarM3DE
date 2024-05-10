import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    email: {
        type: String,
        required: false
    },
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    sessionID: {
        type: Number,
        required: true
    }, 
    admin: {
        type: Boolean,
        required: false
    },
});

const userData = mongoose.model('userData', userDataSchema)
export { userData as default, userData };

