import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}],
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
});

const User = mongoose.model('User', userSchema);

export default User;
