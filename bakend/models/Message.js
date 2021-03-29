
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
        idUSER: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        attachement: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
    });

return Message;
};