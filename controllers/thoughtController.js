const { Thought, User } = require("../models") // Importing necessary models

const thoughtController = {
    // Function to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
                .select("-__v") // Excluding '__v' field from the response
            res.json(thoughtData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // Function to get a single thought by its ID
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
    // Function to create a new thought and associate it with a user
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body)
            const userData = await User.findOneAndUpdate({
                _id: req.body.userId
            },
                {
                    $push: { thoughts: thoughtData._id } // Pushing the thought's ID to the user's 'thoughts' array
                },
                {
                    new: true,
                }
            )
            if (!userData) {
                return res.status(404).json({ message: "No User Found" })
            }
            res.json({ Message: "Thought Created" })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // Function to update a thought by its ID
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId
                },
                {
                    $set: req.body // Updating the thought with the provided request body
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
    // Function to delete a thought by its ID
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
    // Function to add a reaction to a thought
    async addReaction(req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            },
                {
                    $addToSet: { reactions: req.body } // Adding a reaction to the 'reactions' array of the thought
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
    // Function to delete a reaction from a thought
    async deleteReaction(req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            },
                {
                    $pull: { reactions: { reactionId: req.params.reactionId } } // Removing a reaction from the 'reactions' array based on its ID
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

module.exports = thoughtController // Exporting the thoughtController object
