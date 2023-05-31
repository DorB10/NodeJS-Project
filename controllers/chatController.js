const chatService = require("../services/chat-service")

class ChatController {
    async newMessage(request, response) {
        console.log('Chat Controller new: ', request.body);
        try {
            const message = await chatService.addMessage(req.body.payload);
            return response.json(message);
        } catch (error) {
            return response.status(400).json({ err: JSON.stringify(error) })
        }
    }
}

module.exports = {
    chatcontroller: new ChatController()
}