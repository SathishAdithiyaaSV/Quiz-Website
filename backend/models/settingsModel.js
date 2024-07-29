import mongoose from 'mongoose';
import { boolean } from 'webidl-conversions';

const settingsSchema = new mongoose.Schema({
    time: { type: String },
    points: { type: Number},
    buzzer: { type: Boolean },
    numberOfBuzzes: { type: Number },
    answerOnBuzz : { type: Boolean },
    answerAfterTime : { type: Boolean },
    timeAfterFirstBuzz : { type: String },
    timeAfterSecondBuzz : { type: String },
    timeAfterThirdBuzz : { type: String },
    equalPointsOnCorrectAnswer : { type: Boolean },
    firstBuzzAnsweredCorrect: { type: Number },
    firstBuzzAnsweredIncorrect: { type: Number },
    secondBuzzAnsweredCorrect: { type: Number },
    secondBuzzAnsweredIncorrect: { type: Number },
    thirdBuzzAnsweredCorrect: { type: Number },
    thirdBuzzAnsweredIncorrect: { type: Number },
    //room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
});

export default mongoose.model('Settings', settingsSchema);