const Project = require('../models/Project');

module.exports = {
    async index (req, res) {
        // const { user_id } = req.params;

        const projects = await Project.findAll();

        return res.json(projects);
    },

    async show (req, res) {
        const user_id = req.userId;

        const projects = await Project.findAll(
            { where: { user_id : user_id }});

        return res.json(projects);
    },

    async store (req, res) {
        const user_id = req.userId;
        const { title } = req.body;

        try {

            if (!user_id)
                return res.status(400).send({ error: 'User Not Found' })

            const [project, created] = await Project.findOrCreate({
                where: { title },
                defaults: {
                    title, user_id
                }
              });

            if(!created) {
                return res.json({project, created});
            }

            return res.json(project);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Registration failed' });
        }
    }
}