const validTypes = [
  "Plante",
  "Poisson",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris"
        },
        validate: {
          notEmpty: {
            msg: "Le nom du pokemon ne peut pas être une chaine vide.",
          },
          notNull: { msg: "Le nom du pokemon est une propriété requise." },
        },
      },
      //entre 0 et 999
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers." },
          notNull: { msg: "Les points de vie sont une propriété requise." },
          min: { args: [0], msg: "La valeur min des points de vie  est 0" },
          max: {
            args: [999],
            msg: "La valeur max des points de vie est de 99",
          },
        },
      },
      //entre 0 et 99
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers." },
          notNull: { msg: "Les points de vie sont une propriété requise." },
          min: { args: [0], msg: "La valeur min des points de dégâts  est 0" },
          max: {
            args: [99],
            msg: "La valeur max des points de dégâts est de 99",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Le chemin vers l'image doit être une url." },
          notNull: { msg: "Le chemin vers l'image est une propriété requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit avoir au moins 1 type");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon ne peut pas avoir plus de 3 types");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokemon doit appartenir à la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
