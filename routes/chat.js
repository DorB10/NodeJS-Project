var express = require('express');
var router = express.Router();
var path = require('path');
var eventService = require('../services/eventService');
const {checkToken} = require('../middleware/mid')
const chatService = require('../services/chat-service')
    /* GET home page. */
router.get('/', checkToken ,async function(req, res, next) {
    req.headers['authorization'] =  req.query.token
    eventService.eventEmitter.emit('sign',req.decoded);
    const messages = await  chatService.fetchMessages();
    res.sendFile(path.join(__dirname,'../public/chat_room.html'));
});

module.exports = router;