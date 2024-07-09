import Room from '../models/roomModel.js';
import Round from '../models/roundModel.js';

const createQuestion = async (properties) => {
    const qn = new Question(properties);
    const newQn = await qn.save();
    return newQn;
}

const createRound = async (properties) => {
    const qns = properties.questions;
    const QNS = qns.map((qn) => createQuestion(qn));
    
}

export const createRoom = async (req, res) => {
    const room = new Room(req.body);
    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};