const userService = require("../services/user-service")

class UsersController {

    usersList(request, response) {
        console.log('User Controller List');
        userService.usersList((error, data) => {
            if (error) return response.status(400).json({ err: JSON.stringify(error) })
            return response.json(data);
        });
    }

    // findUser(request, response) {
    //     console.log('User Controller find');
    //     userService.findUser(request.body.user, (error, data) => {
    //         if (error) return response.status(400).json({ err: JSON.stringify(error) })
    //         return response.json(data);
    //     });
    // }

    async newUser(request, response) {
        console.log('User Controller new: ', request.body);
        try {
            const user = await userService.addUser(request.body);
            return response.json(user);
        } catch (error) {
            return response.status(400).json({ err: JSON.stringify(error) })
        }
    }
    async loginUser(request, response) {
        try {
            const user = await userService.findUser(request.body);
            return response.json(user);

        } catch (error) {
            return response.status(400).json({ err: JSON.stringify(error) })
        }
    }
    async getUserById(request,response){
        try {
       
            const user = await userService.getUserByID(request.query.userID);
            return response.json(user);
        } catch (error) {
            return response.status(400).json({ err: JSON.stringify(error) })
        }
    }

    async updateUser(request, response) {
        try {
            console.log(request.params)
            const user = await userService.updateUser(request.body,request.params.userID);
            return response.json(user);

        } catch (error) {
            return response.status(400).json({ err: JSON.stringify(error) })
        }
    }
    async getUserByToken(request,response){
        return response.json(request.user);
    }

    async deleteUser(request, response) {
        try {
            console.log(request.body.userID)
            const user = await userService.deleteUser(request.body.userID);
            return response.json(user);

        } catch (error) {
            return response.status(400).json({ err: JSON.stringify(error) })
        }
    }

    async fetchAllUsers(request, response) {
        try {
            console.log(request.body.userID)
            const user = await userService.fetchAllUsers();
            return response.json(user);

        } catch (error) {
            return response.status(400).json({ err: JSON.stringify(error) })
        }
    }

}

module.exports = {
    usersController: new UsersController()
}