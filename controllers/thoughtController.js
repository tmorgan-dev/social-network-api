const { Thought, User } = require("../models")
const thoughtController = {
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
                .select("-__v")
            res.json(thoughtData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async getOneThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
                .select("-__v")
            if (!thoughtData) {
                return res.status(404).json({ message: "No Thought Found" })
            }
            res.json(thoughtData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    //TODO: Push thoughts to an array associated with the user
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body)
            const userData = await User.findOneAndUpdate({
                    _id: req.body.userId
                },
                {
                    $push: {thoughts: thoughtData._id}
                },
                {
                    new: true,
                }
            )
            if (!userData) {
                return res.status(404).json({ message: "No User Found" })
            }
            res.json({Message: "Thought Created"})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId
                },
                {
                    $set: req.body
                },
                {
                    runValidators: true,
                    new: true,
                }
            )
            res.json(thoughtData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({
                _id: req.params.thoughtId
            })
            if (!thoughtData) {
                return res.status(404).json({ message: "No Thought Found" })
            }
            res.json({ message: "Thought Deleted" })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    //TODO: Fix addReaction
    async addReaction(req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            },
                {
                    $addToSet: { reactions: req.body }
                },
                {
                    runValidators: true,
                    new: true
                    
                }

            )
            if (!reactionData) {
                return res.status(404).json({ message: "No Thought Found" })
            }
            res.json(reactionData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    //TODO: Fix deleteReaction
    async deleteReaction(req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            },
                {
                    $pull: {reactions:{ reactionId: req.params.reactionId }}
                },
                {
                    runValidators: true,
                    new: true
                }

            )
            if (!reactionData) {
                return res.status(404).json({ message: "No Reaction Found" })
            }
            res.json(reactionData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

module.exports = thoughtController