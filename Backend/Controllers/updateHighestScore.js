import User from "../Models/userModel.js";

export const updateHighestScore = async (req, res) => {
    console.log("i am print",req.body)
    const { userId, score } = req.body;
    console.log(userId,score);
    try {
        const user = await User.findById(userId);
        console.log(user,'ajbdjad');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (score > user.highestScore) {
            user.highestScore = score;
            await user.save();
        }

        res.status(200).json({ highestScore: user.highestScore });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
