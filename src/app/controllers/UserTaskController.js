const User = require('../models/User');
const Task = require('../models/Task');

module.exports = {

    async store (req, res) {
        const user_id = req.userId;
        const { task_id } = req.body;

        try {

            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            const task = await Task.findByPk(task_id);

            if (!task) {
                return res.status(400).json({ error: 'Task not found' });
            }

            const associate = await user.addTask(task);
            
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
        const user_id = req.userId;
        const { task_id } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const task = await Task.findOne({
            where: { id: task_id }
        });

        if (!task) {
            return res.status(400).json({ error: 'Task not found' });
        }

        await user.removeTask(task);

        return res.json();
    }
}