import Room from '../models/roomModel.js';
import Round from '../models/roundModel.js';
import Question from '../models/questionModel.js';
import User from '../models/userModel.js';
import Settings from '../models/settingsModel.js';

const createSettings = async (properties) => {
    const settings = new Settings(properties);
    const newSettings = await settings.save();
    return newSettings._id;
}

const createQuestion = async (properties) => {
    const qn = new Question(properties);
    const newQn = await qn.save();
    return newQn;
}

const createRound = async (roundProperties) => {
    try {
        // Save each question and get their IDs

        for(var i = 0; i < roundProperties.questions.length; i++) {
            const newQn = await createQuestion(roundProperties.questions[i]);
            roundProperties.questions[i] = newQn._id;
        }

        // Create a new round with the question IDs
        const round = new Round(roundProperties);

        const newRound = await round.save();

        return newRound;
    } catch (err) {
        console.error('Error creating round with questions:', err);
    }
};

export const createRoom = async (req, res) => {
    var properties = req.body;
    try {
        for(var i = 0; i < properties.rounds.length; i++) {
            const newRound = await createRound(properties.rounds[i]);
            properties.rounds[i] = newRound._id;
        }
        properties["host"] = req.user._id;
        // Create a new round with the question IDs
        if(properties.settingsLevel === "room")
            properties.settings=await createSettings(properties.settings);
        const room = new Room(properties);
        const newRoom = await room.save();
        await User.updateOne({_id: req.user._id}, {$push : {rooms: newRoom._id}});
        res.status(201).json({roomId: newRoom._id.toString()});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};