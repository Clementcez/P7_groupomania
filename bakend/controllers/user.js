const { User } = require("../models");
const { Message } = require('../models');
const { Comment } = require('../models');
const bcrypt = require('bcrypt');
const webToken = require('jsonwebtoken');
const validator = require('validator');
const pseudoRegex =  /[\"\'\s\/\:]/;

exports.signUp = (req, res, next) => {
    if( !validator.isEmail(req.body.email)){
        throw res.status(500).json({ error:"Email non valide" });
    }
    else if ( !validator.isStrongPassword(req.body.password)){
        throw res.status(500).json({ error:"Mot de passe non valide" });
    } 
    else if( ( pseudoRegex.test(req.body.username) || req.body.username == "" )){
        throw res.status(500).json({ error:"Pseudo non valide" });
    }
    else{
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                email : req.body.email,
                username: req.body.username,
                password: hash,
                isAdmin: "0"
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé!'}))
            .catch(() => res.status(500).json({ error:"utilisateur existant" })) 
        })
        .catch(error => res.status(500).json({ error })) 
    }
};

exports.logIn = (req, res, next) => {
    if( !validator.isEmail (req.body.email)){
        throw res.status(500).json({ error:"Email non valide" });
    }
    else{
        User.findOne({ where: { email: req.body.email} })
        .then(user => {
            if(!user){
                return res.status(401).json({error: 'Utilisateur non trouvé'})
            }
            else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) {
                            return res.status(401).json({error: 'Mauvais mot de passe !'})
                        }
                        res.status(200).json({
                            userId: user.id,
                            admin: user.isAdmin,
                            token: webToken.sign(
                                { userId: user.id },
                                'TOKEN_SECRET',
                                { expiresIn: '24h' }
                            )
                        });
                    })
                .catch(error => res.status(500).json({ error }))               
            }
        })
        .catch(error => res.status(500).json({ error }))
    }
};

exports.findWithUsername = (req, res, next ) => {
    User.findOne ({ where: { username: req.params.username } })
    .then(profil => res.status(200).json(profil))
    .catch(error => res.status(400).json({ error }));
};

exports.findWithId = (req, res, next ) => {
    User.findOne ({ where: { id: req.params.id } })
    .then(profil => res.status(200).json(profil))
    .catch(error => res.status(400).json({ error }));
};

exports.findAllMessages = (req, res, next) => {
    Message.findAll ({ where: { idUSER: req.params.id } })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
};

exports.findAllComments = (req, res, next) => {
    Comment.findAll ({ where: { idUSER: req.params.id } })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

exports.delete = (req, res, next) => {
    Comment.destroy({ where: { idUSER: req.params.id} })
    .then(
        Message.destroy({ where: { idUSER: req.params.id} })
            .then( User.destroy({ where: { id: req.params.id} }))
                .then(() => res.status(200).json({ message: 'objet supprimé !'}))
                .catch(error => res.status(500).json({ error }))
            .catch(error => res.status(500).json({ error }))
    )
    .catch(error => res.status(500).json({ error }))
};
