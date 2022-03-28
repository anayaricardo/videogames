const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('videogame', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });
// };

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    rating: {
      type: DataTypes.DECIMAL(10,1),
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    },
    platforms: {
      platform: {
        name: {
      type: DataTypes.STRING,
      allowNull: false,
    }}},
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValues: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
  },
  {
    timestamps: false
  }
  );
};

