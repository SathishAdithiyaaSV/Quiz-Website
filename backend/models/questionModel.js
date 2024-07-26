import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'multiple-choice', 'true-false', etc.
    text: { type: String, required: true },
    options: [String], // Only required for multiple-choice questions
    buzzedInQueue: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    buzzedIn: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    buzzNo: {type: Number, default: 0},
    answer: { type: String, required: true },
    settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Settings' },
    mainTime: { type: Number },
});

export default mongoose.model('Question', questionSchema);
