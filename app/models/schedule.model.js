module.exports = (sequelize, Sequelize, DataTypes) => {
    const Schedule = sequelize.define(
        "schedule", // Model name
        {
            // Model attributes
            sch_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            appointment_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
             start_time: {
                 type: DataTypes.TIME,
                 allowNull: false,
             },
             end_time: {
                 type: DataTypes.TIME,
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
        }, {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return Schedule;
};