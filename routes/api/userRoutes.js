const router = require("express").Router()
const { 
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController.js")

router.route("/").get(getUsers).post(createUser)
router.route("/:userId").get(getOneUser).post(updateUser).delete(deleteUser)
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)