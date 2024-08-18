import User from "../Models/userModel.js";

export const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({}).sort({ highestScore: -1 });
        const leaderboard = users.map(user => ({
            name: user.name,
            gender: user.gender,
            highestScore: user.highestScore
        }));
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
