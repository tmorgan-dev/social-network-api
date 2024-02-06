const { User, Thought } = require("../models") // Importing necessary models

const userController = {
    // Function to get all users
    async getUsers(req, res) {
        try {
            const userData = await User.find()
                .select("-__v") // Excluding '__v' field from the response
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // Function to get a single user by its ID and populate its friends and thoughts
    async getOneUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
                .select("-__v")
                .populate("friends") // Populating the 'friends' field
                .populate("thoughts") // Populating the 'thoughts' field
            if (!userData) {
                return res.status(404).json({ message: "No User Found" })
            }
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // Function to create a new user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body)
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // Function to update a user by its ID
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                {
                    _id: req.params.userId
                },
                {
                    $set: req.body // Updating user data with the provided request body
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
    // Function to delete a user by its ID, also deleting associated thoughts
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({
                _id: req.params.userId
            })
            console.log(userData)
            if (!userData) {
                return res.status(404).json({ message: "No User Found" })
            }
            // Deleting thoughts associated with the user
            await Thought.deleteMany({
                _id: { $in: userData.thoughts }
            })
            res.json({ message: "User Deleted" })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // Function to add a friend to a user
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({
                _id: req.params.userId
            },
                {
                    $addToSet: { friends: req.params.friendId } // Adding friend's ID to the 'friends' array of the user
                },
                {
                    new: true,
                }

            )
            if (!userData) {
                return res.status(404).json({ message: "No User Found" })
            }
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // Function to delete a friend from a user
    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({
                _id: req.params.userId
            },
                {
                    $pull: { friends: req.params.friendId } // Removing friend's ID from the 'friends' array of the user
                },
                {
                    new: true,
                }

            )
            if (!userData) {
                return res.status(404).json({ message: "No User Found" })
            }
            res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

module.exports = userController // Exporting the userController object
