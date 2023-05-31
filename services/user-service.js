const mongoose = require('mongoose');
const userSchema = require('../models/user.model');
const User = mongoose.model('User', userSchema);
const bcrypt = require('bcrypt');

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        const finalUser = new User(user);
        finalUser.password = bcrypt.hashSync(finalUser.password, 10);
        finalUser.save()
            .then((usr) => {
                console.log('data: ', usr);
                resolve(user);
            })
            .catch((err) => reject(err));
    });
}

const getUserByID = (id)=>{
    console.log("getUserByID ",id)
    return new Promise((resolve, reject) => {
        User.findById(id, (error, data) => {
            if (error) {
                console.log(error)
                reject(error);
                return;
            }
            console.log(data);
            resolve(data);
        })
    })
}

const findUser = (email) => {
    
    return new Promise((resolve, reject) => {
        console.log('Find User', email)
        User.find({ email: email }, (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        })
    })

}

const updateUser = (user,userID) => {
    console.log('service:::update userID ,' , userID)
    
    console.log('service:::update user ,' , user)
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(userID, {
            $set: user
        }, null, (error, data) => {
            if (error) {
                console.log(error);
                reject(error)
                return
            }
            resolve(data);
        });

    })
}

const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({ _id: userId }, (error, data) => {
            if (error) {
                reject(error)
                return
            }
            resolve(data);
        });
    })
}


const fetchAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (error, data) => {
            if (error) {
                reject(error)
                return
            }
            resolve(data);
        });
    })
}


module.exports = { addUser, findUser, updateUser, deleteUser, fetchAllUsers,getUserByID }