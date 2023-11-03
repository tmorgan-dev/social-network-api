const { User, Thought } = require("../models")
const userController = {
    async getUsers(req, res) {
        try {
            const userData = await User.find()
            .select("-__v")
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async getOneUser(req, res) {
        try {
            const userData = await User.findOne({_id:req.params.userId})
            .select("-__v")
            .populate("friends")
            .populate("thoughts")
            if (!userData) {
                return res.status(404).json({message:"No User Found"})
            }
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body)
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                {
                    _id:req.params.userId
                },
                {
                    $set:req.body
                },
                {
                    runValidators: true,
                    new: true,
                }
            )
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({
                _id:req.params.userId
            })
            console.log(userData)
            if (!userData) {
                return res.status(404).json({message:"No User Found"})
            }
            // TODO: Thoughts are left intact after user is deleted
            await Thought.deleteMany({
                _id:{$in:userData.thoughts}
            })
            res.json({message:"User and Thoughts Deleted"})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({
                _id:req.params.userId
            },
            {
                $addToSet: {friends:req.params.friendId}
            },
            {
                new:true,
            }

            )
            if (!userData) {
                return res.status(404).json({message:"No User Found"})
            }
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({
                _id:req.params.userId
            },
            {
                $pull: {friends:req.params.friendId}
            },
            {
                new:true,
            }

            )
            if (!userData) {
                return res.status(404).json({message:"No User Found"})
            }
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

module.exports = userController