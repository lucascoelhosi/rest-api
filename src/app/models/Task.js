const { Model, DataTypes } = require('sequelize');

class Task extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING,
            completed: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            tableName: 'tasks'
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'task_id', through: 'user_tasks', as: 'users' });
        this.belongsToMany(models.Project, { foreignKey: 'task_id', through: 'project_tasks', as: 'projects' });
    }
}

module.exports = Task;