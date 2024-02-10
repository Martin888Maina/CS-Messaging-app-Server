module.exports = (Sequelize, DataTypes) => {
    const Message = Sequelize.define("Message", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        timestamp: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        message_body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return Message;
};
