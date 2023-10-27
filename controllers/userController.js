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
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async createUser(req, res) {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async updateUser(req, res) {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async deleteUser(req, res) {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async addFriend(req, res) {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async deleteFriend(req, res) {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

module.exports = userController