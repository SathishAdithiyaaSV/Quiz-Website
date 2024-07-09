import mongoose from 'mongoose';
import { boolean } from 'webidl-conversions';

const settingsSchema = new mongoose.Schema({
    time: { type: String },
    points: { type: double},
    buzzer: { type: boolean },
    answerOnBuzz : { type: boolean },
    answerAfterTime : { type: boolean },
    timeAfterBuzz : { type: String },
    equalPointsOnCorrectAnswer : { type: boolean },
    //room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
});

export default mongoose.model('Settings', settingsSchema);