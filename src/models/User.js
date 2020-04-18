const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password_hash: DataTypes.STRING,
        }, {
            scopes: {
                withoutPassword: {
                  attributes: { exclude: ['password_hash'] },
                }
            },
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany(models.Adress, { foreignKey: 'user_id', as: 'adresses' });
    }
}

module.exports = User;