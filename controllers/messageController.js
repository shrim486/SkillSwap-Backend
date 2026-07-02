const Message = require("../models/Message");


const sendMessage = async (req, res) => {

    try {

        const { receiver, text } = req.body;

        const message = await Message.create({

            sender: req.user,
            receiver,
            text

        });

        res.status(201).json(message);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const getMessages = async (req, res) => {

    try {

        const myId = req.user;
        const otherUser = req.params.id;

console.log("MY ID:", myId);
console.log("OTHER USER:", otherUser);

const result = await Message.updateMany(

    {
        sender: otherUser,
        receiver: myId,
        seen: false
    },

    {
        seen: true
    }

);

console.log("UPDATED:", result);
        await Message.updateMany(

            {

                sender: otherUser,
                receiver: myId,
                seen: false

            },

            {

                seen: true

            }

        );


        const messages = await Message.find({

            $or: [

                {
                    sender: myId,
                    receiver: otherUser
                },

                {
                    sender: otherUser,
                    receiver: myId
                }

            ]

        }).sort({

            createdAt: 1

        });

        res.json(messages);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {

    sendMessage,
    getMessages

};