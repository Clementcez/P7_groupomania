const { User } = require("../models");
const { Message } = require('../models');
const bcrypt = require('bcrypt');
const webToken = require('jsonwebtoken');
const validator = require('validator');
const pseudoRegex =  /[\"\'\s\/\:]/;

exports.signUp = (req, res, next) => {
    if( !validator.isEmail(req.body.email)){
        throw 'Email non valable !';
    }
    else if ( !validator.isStrongPassword(req.body.password)){
        throw 'Mot de pass non valable !';
    } 
    else if( ( pseudoRegex.test(req.body.username) || req.body.username == "" )){
        throw 'Pseudo non valable !';
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
                .catch(error => res.status(500).json({ error, message:"utilisateur existant" })) 
            })
            .catch(error => res.status(500).json({ error })) 
        }
};

exports.logIn = (req, res, next) => {
    if( !validator.isEmail (req.body.email)){
        throw 'Email non valable !';
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

exports.find = (req, res, next ) => {
    User.findOne ({ where: { id: req.params.id } })
    .then(profil => res.status(200).json(profil))
    .catch(error => res.status(400).json({ error }));
};

exports.findAllMyMessages = (req, res, next) => {
    Message.findAll ({ where: { idUSER: req.params.id } })
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
};

exports.delete = (req, res, next) => {
    Message.destroy({ where: { idUSER: req.params.id} })
    .then( User.destroy({
         where: { id: req.params.id} 
        }))
        .then(() => res.status(200).json({ message: 'objet supprimé !'}))
        .catch(error => res.status(500).json({ error }))
    .catch(error => res.status(500).json({ error }))
};
