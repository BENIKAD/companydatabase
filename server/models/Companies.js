module.exports = (sequelize, DataTypes) => {
    const Companies = sequelize.define("Companies", {
        id: {
            type: DataTypes.INTEGER, // Use INTEGER for primary key
            autoIncrement: true, // Auto increment for unique ID
            primaryKey: true,
            allowNull: false
        },
        vatNumber: { // Use camelCase and more descriptive field name
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // Ensure VAT number is unique
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyAddress: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Companies.associate = (models) => {
        Companies.hasMany(models.Users, {
            foreignKey: "companyId",
            as: "users"
        });
    };

    return Companies;
};
