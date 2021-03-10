module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        idMESSAGE: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Messages',
                key: 'id',
            },
        },
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
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

return Comment;
};