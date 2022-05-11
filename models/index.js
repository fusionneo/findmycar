const User = require('./User');
const Cars = require('./Cars');

User.hasMany(Cars, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

Cars.belongsTo(User, {
  foreignKey: 'id'
});

module.exports = { User, Cars };
