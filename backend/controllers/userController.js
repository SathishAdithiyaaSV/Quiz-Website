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