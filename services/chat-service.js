const mongoose = require('mongoose');
const chatSchema = require('../models/chat.model');
const Chat = mongoose.model('Chat', chatSchema);

const addMessage = (messageObj) => {
    return new Promise((resolve, reject) => {
        const newChatMessage = new Chat(messageObj);
        newChatMessage.save()
            .then((chat) => {
                console.log('data: ', chat);
                resolve(chat);
            })
            .catch((err) => reject(err));
    });
}
const fetchMessages = () => {
    return new Promise((resolve, reject) => {
        Chat.find({}, (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        });
    });
}

module.exports = { addMessage, fetchMessages }