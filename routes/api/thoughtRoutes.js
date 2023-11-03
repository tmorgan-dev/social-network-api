const router = require("express").Router()
const { 
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughtController.js")

router.route("/").get(getThoughts).post(createThought)
router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought)
router.route("/:thoughtId/reactions/:reactionId").post(addReaction).delete(deleteReaction)

module.exports = router;