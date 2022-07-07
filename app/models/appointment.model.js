module.exports = (sequelize, Sequelize, DataTypes) => {
    const Appointment = sequelize.define(
        "appointment", // Model name
        {
            // Model attributes
            apt_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            apt_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            apt_time: {
                allowNull: false,
                type: DataTypes.TIME
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING
            },
            doc_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            pat_id: {
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

    return Appointment;
};