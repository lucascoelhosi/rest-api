const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password_hash: DataTypes.STRING,
            password_reset_token: DataTypes.STRING,
            password_reset_expires: DataTypes.DATE,
        }, {
            scopes: {
                withoutPassword: {
                    attributes: { 
                        exclude: ['password_hash', 'password_reset_token', 'password_reset_expires'] 
                    },
                }
            },
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany(models.Adress, { foreignKey: 'user_id', as: 'adresses' });
        this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
        this.belongsToMany(models.Task, { foreignKey: 'user_id', through: 'user_tasks', as: 'tasks' });
    }
}

module.exports = User;