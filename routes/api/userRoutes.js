const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// Get All Users & Post New User
router.route('/').get(getUsers).post(createUser);

// Get Single User by ID, Delete User by ID, & Update User
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// Add Friend
router.route('/:userId/friends/friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
