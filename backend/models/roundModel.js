import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }],
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
});

export default mongoose.model('Round', roundSchema);
