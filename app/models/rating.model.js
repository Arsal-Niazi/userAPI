module.exports = (sequelize, Sequelize, DataTypes) => {
    const Rating = sequelize.define(
        "rating", // Model name
        {
            // Model attributes
            doc_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            apt_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            review: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            star: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        }, {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return Rating;
};