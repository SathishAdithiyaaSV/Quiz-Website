import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }],
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Settings' },
});

export default mongoose.model('Round', roundSchema);
