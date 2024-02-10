const db = require('../models/indexStart');
const createError = require('http-errors');
const Message = db.messages;


// Function to emit a new message to connected sockets
const emitNewMessage = (message) => {
    io.emit('message', message);
};

module.exports = {
  
    addMessage: async (req, res, next) => {
        try {
            // Find the highest existing ID
            const highestIdMessage = await Message.findOne({
                order: [['id', 'DESC']]
            });
    
            // Calculate the next ID
            let nextId = highestIdMessage ? highestIdMessage.id + 1 : 1;
           
            const timeStamp = new Date().toISOString();
            // Prepare the message data
            let info = {
                id: nextId,
                timestamp: timeStamp,
                message_body: req.body.message_body
            };
    
            // Create the new message entry
            const addMessage = await Message.create(info);
    
            // Respond with the newly created message
            res.status(200).send(addMessage);
        } catch (error) {
            next(error);
        }
    },

    getMessages: async (req, res, next) => {
        try {
            let allMessages = await Message.findAll();
            // Emit the new message to connected sockets
            // emitNewMessage(io, allMessages);
            res.status(200).send(allMessages);
        } catch (error) {
            next(error);
        }
    },

    getMessage: async (req, res, next) => {
        try {
            let id = req.params.id;
            let message = await Message.findOne({ where: { id: id } });
            if (!message) {
                throw createError(404, "Message does not Exist");
            }
            res.status(200).send(message);
        } catch (error) {
            next(error);
        }
    },

    updateMessage: async (req, res, next) => {
        try {
            let id = req.params.id;
            const [rowsUpdated, [updatedMessage]] = await Message.update(req.body, { where: { id: id }, returning: true });
            if (rowsUpdated === 0) {
                throw createError(404, "Message does not exist");
            }
            res.status(200).send(updatedMessage);
        } catch (error) {
            next(error);
        }
    },

    deleteMessage: async (req, res, next) => {
        try {
            let id = req.params.id;
            let deletedCount = await Message.destroy({ where: { id: id } });
            if (deletedCount === 0) {
                throw createError(404, "Message does not exist");
            }
            res.status(200).send("Message Deleted Successfully");
        } catch (error) {
            next(error);
        }
    }
};



