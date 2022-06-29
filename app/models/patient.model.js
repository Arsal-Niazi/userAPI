module.exports = (sequelize, Sequelize, DataTypes) => {
    const Patient = sequelize.define(
        "patient", // Model name
        {
            // Model attributes
            pat_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            cell: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            home: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            work: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            preferred_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dob: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },


            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },{
            // Options
            timestamps: true,
            underscrored: true,
           createdAt: "created_at",
           updatedAt: "updated_at"
        }
    );

    return Patient;
};