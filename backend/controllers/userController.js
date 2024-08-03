import Room from "../models/roomModel.js";
import User from "../models/userModel.js";


export const home = async (req, res) => {
    try {
        const rooms = await Room.find({ _id: { $in: req.user.rooms } });
        res.status(200).json({ rooms });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const profile = async (req, res) => {
    try {
        const username = req.user.username;
        const email = req.user.email;
        res.status(200).json({ username, email });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};