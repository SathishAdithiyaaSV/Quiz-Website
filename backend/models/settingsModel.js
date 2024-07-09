import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
});

export default mongoose.model('Settings', settingsSchema);