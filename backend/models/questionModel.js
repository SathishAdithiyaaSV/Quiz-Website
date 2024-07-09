import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'multiple-choice', 'true-false', etc.
    question: { type: String, required: true },
    options: [String], // Only required for multiple-choice questions
    answer: { type: String, required: true },
    round: { type: mongoose.Schema.Types.ObjectId, ref: 'Round', required: true },
    settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Settings' },
});

export default mongoose.model('Question', questionSchema);
