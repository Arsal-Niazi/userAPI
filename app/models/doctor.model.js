module.exports = (sequelize, Sequelize, DataTypes) => {
    const Doctor = sequelize.define(
        "doctor", // Model name
        {
            // Model attributes
            doc_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            mdcn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            specialty: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                 allowNull: false,
            },
            
            start_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            file1: {
                type: DataTypes.STRING,
                allowNull: false,
            },
             file2: {
                 type: DataTypes.STRING,
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

    return Doctor;
}; 