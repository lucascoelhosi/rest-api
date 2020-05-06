const Project = require('../models/Project');
const Task = require('../models/Task');

module.exports = {

    async store (req, res) {
        const { project_id, task_id } = req.body;

        try {

            const project = await Project.findByPk(project_id);

            if (!project) {
                return res.status(400).json({ error: 'Project not found' });
            }

            const task = await Task.findByPk(task_id);

            if (!task) {
                return res.status(400).json({ error: 'Task not found' });
            }

            const associate = await project.addTask(task);
            
            if(!associate) {
                return res.status(202).json({ error: 'Associate already exists' });
            }

            return res.json(task);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Associate Task failed' });
        }
    },

    async delete (req, res) {
        const { project_id, task_id } = req.body;

        const project = await Project.findByPk(project_id);

        if (!project) {
            return res.status(400).json({ error: 'Project not found' });
        }

        const task = await Task.findOne({
            where: { id: task_id }
        });

        if (!task) {
            return res.status(400).json({ error: 'Task not found' });
        }

        await project.removeTask(task);

        return res.json();
    }
}