import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
    number: {type: Number, required: true},
    name: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }],
    settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Settings' },
});

export default mongoose.model('Round', roundSchema);
