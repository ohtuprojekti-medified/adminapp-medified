module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_medicine', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    user_id: DataTypes.STRING,
    name: DataTypes.STRING,
    strength: DataTypes.STRING,
    instructions: DataTypes.STRING,
    state: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'DELETED']
    },
  }, {
    timestamps: false
  })
}