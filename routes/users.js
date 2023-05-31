var express = require('express');
var router = express.Router();
const { usersController } = require('../controllers/userscontroller');
const mid = require('../middleware/mid');

// router.get("/list", mid.checkToken, (request, response)=> usersController.usersList(request, response));
// router.post("/find", mid.checkToken ,(request, response)=> usersController.findUser(request, response));
router.post("/new", (request, response) => usersController.newUser(request, response));
router.get('/getLoggedUser',mid.checkToken,(request,response) => usersController.getUserByToken(request,response));
router.get("/user",(request,response) => usersController.getUserById(request,response));
router.put("/update/:userID", (request, response) => usersController.updateUser(request, response));
router.delete("/delete", (request, response) => usersController.deleteUser(request, response));
router.get("/all", (request, response) => usersController.fetchAllUsers(request, response));
module.exports = router;