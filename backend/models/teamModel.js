import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    answeredCorrectly: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answeredIncorrectly: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    notAttempted: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    points: { type: Number }
});

export default mongoose.model('Team', teamSchema);
