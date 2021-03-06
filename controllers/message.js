const { Message } = require('../models')

exports.createMessage = (req, res, next) =>{
    Message.create ({
        idUSER: req.body.userId,
        title: req.body.title,
        content: req.body.content,
    })
    .then(() => res.status(201).json({ message: 'Objet enregister' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifMessage = (req, res, next) => {
    Message.findOne ({ where: { id: req.params.id} })
    .then( message => {
        Message.update({
            title: req.body.title ? req.body.title : message.title,
            content: req.body.content ? req.body.content : message.content,
        },
            { where: { id: req.params.id} 
        })
        .then(() => res.status(200).json({ message: 'objet modifié !'}))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
};

exports.deleteMessage = (req, res, next) => {
    Message.destroy ({ where: { id: req.params.id} })
    .then(() => res.status(200).json({ message: 'objet supprimé !'}))
    .catch(error => res.status(500).json({ error }))
};

exports.readAllMessages = (req, res, next) => {
    Message.findAll()
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
};

// exports.readMessage = (req, res, next) => {

// };

// app.post("/message", (req, res) => {
//     Message.create ({
//         idUSERS: "1",
//         title: "mon titre",
//         content: "salut les amies c'est David Lafarge",
//     })
//     .catch((error) => {
//         if (error){
//             console.log(error)
//         }
//     });
//     res.send("créé");
// });