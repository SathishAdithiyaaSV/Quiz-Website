import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
    type: { type: String, required: true},
    teamSize: { type: Number },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round', required: true}],
    settingsType: { type:String },   
    settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Settings' },
});

export default mongoose.model('Room', roomSchema);
