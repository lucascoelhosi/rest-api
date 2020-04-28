const Task = require('../models/Task');

module.exports = {
    async index (req, res) {
        const tasks = await Task.findAll();

        return res.json(tasks);
    },

    async show (req, res) {
        // const user_id = req.userId;

        // if (!user_id)
        //     return res.status(400).send({ error: 'User Not Found' })

        // const projects = await Project.findAll(
        //     { where: { user_id : user_id }});

        // return res.json(projects);
    },

    async store (req, res) {
        const { title, completed } = req.body;

        try {

            const [task, created] = await Task.findOrCreate({
                where: { title },
                defaults: {
                    title, completed
                }
              });

            if(!created) {
                return res.json({task, created});
            }

            return res.json(task);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Create Task failed' });
        }
    }
}