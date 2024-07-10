import mongoose from 'mongoose';
import { boolean } from 'webidl-conversions';

const settingsSchema = new mongoose.Schema({
    time: { type: String },
    points: { type: Number},
    buzzer: { type: Boolean },
    answerOnBuzz : { type: Boolean },
    answerAfterTime : { type: Boolean },
    timeAfterBuzz : { type: String },
    equalPointsOnCorrectAnswer : { type: Boolean },
    //room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
});

export default mongoose.model('Settings', settingsSchema);