const { Message } = require('../models');
const { Comment } = require('../models');
const { User } = require('../models');
const fs = require('fs');

exports.createMessage = (req, res, next) =>{
    User.findOne({ where:{ id: req.body.userId }})
    .then(user => {
        Message.create ({
            idUSER: req.body.userId,
            title: 'message de' + ' ' + user.username,
            content: req.body.content,
            attachement: req.file ? `${req.protocol}://${req.get('host')}/img/${req.file.filename}` : null
        })
        .then(() => res.status(201).json({ message: 'Objet enregister' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) =>{
    Comment.create ({
        idMESSAGE: req.body.messageId,
        idUSER: req.body.userId,
        comContent: req.body.comContent,
    })
    .then(() => res.status(201).json({ message: 'Commentaire enregister' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifMessage = (req, res, next) => {
    Message.findOne ({ where: { id: req.params.id} })
    .then( response => {
        Message.update({
            content: req.body.content ? req.body.content : response.content
        },
        { where: { id: req.params.id}}
        )
        .then(() => res.status(200).json({ message: 'objet modifié !'}))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
};

exports.deleteMessage = (req, res, next) => {
    Message.findOne ({ where: { id: req.params.id} })
    .then( response => {
        if(response.attachement){
            const filename = response.attachement.split('/img/')[1];
            fs.unlink(`img/${filename}`, (err) => {
                if (err) throw err;
            })
        }
        Comment.destroy ({ where: { idMESSAGE : response.id}})
        .then(() => {
            Message.destroy ({ where: { id: response.id} })
            .then(() => res.status(200).json({ message: 'objet supprimé !'}))
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error =>res.status(500).json({ error }))
};

exports.deleteComment = (req, res, next) => {
    console.log(req.params)
    Comment.destroy ({ where: { id: req.params.id} })
    .then(() => res.status(200).json({ message: 'objet supprimé !'}))
    .catch(error => res.status(500).json({ error }))
};

exports.readAllPosts = (req, res, next) => {
    Message.hasMany(Comment, {foreignKey: 'idMESSAGE'})
    User.hasMany(Comment, {foreignKey: 'idUSER'})
    Comment.belongsTo(User, {foreignKey: 'idUSER'})

    Message.findAll({
        include: [{model: Comment, include: { model: User }}],
        order:  [['id','DESC']],
        limit: 20
    })
    .then(messages => res.status(200).json({ messages }))
    .catch(error => {
        console.log(error),
        res.status(400).json({ error })
    });
};