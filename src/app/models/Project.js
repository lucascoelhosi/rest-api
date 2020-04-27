const { Model, DataTypes } = require('sequelize');

class Project extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'projects'
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsToMany(models.Task, { foreignKey: 'project_id', through: 'project_tasks', as: 'tasks' });
    }
}

module.exports = Project;