module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_treatments', {
    snapshot_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    name: DataTypes.STRING,
    frequency: DataTypes.DOUBLE,
    extra: DataTypes.STRING,
    state: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'PASSIVE', 'DELETED']
    },
    type: {
      type: DataTypes.ENUM,
      values: ['THERAPY', 'PEER_SUPPORT']
    }
  }, {
    timestamps: false
  })
}