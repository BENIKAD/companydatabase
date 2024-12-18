module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      id: {
        type: DataTypes.INTEGER, // Use INTEGER for primary key
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstName: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      companyId: { // Foreign key for company relationship
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Companies",
          key: "id"
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: { // Add the password field
        type: DataTypes.STRING,  // Store the hashed password as a string
        allowNull: false
      }
    });
  


    Users.associate = (models) => {
      Users.belongsTo(models.Companies, {
        foreignKey: "companyId",
        as: "company"
      });
    };
  
    return Users;
  };
  