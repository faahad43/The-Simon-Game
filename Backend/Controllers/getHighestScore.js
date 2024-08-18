import User from "../Models/userModel.js";

export const getHighestScore = async (req,res) =>{
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ highestScore: user.highestScore });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}