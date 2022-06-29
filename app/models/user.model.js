module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
        "user", // Model name
        {
            firstname: {
                type: DataTypes.STRING,
                unique: false
            },
            lastname: {
                type: DataTypes.STRING,
                unique: false
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            register_as: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING
            }
        }, {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return User;
};