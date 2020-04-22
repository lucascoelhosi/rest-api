const User = require('../../models/User');
const Adress = require('../../models/Adress');

module.exports = {
    async index (req, res) {
        const { user_id } = req.params;

        const user = await User.scope('withoutPassword').findByPk(user_id, {
            include: { association: 'adresses' }
        });

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        return res.json(user);
    },

    async store (req, res) {
        const { user_id } = req.params;
        const { zipcode, street, number } = req.body;

        try {
            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }

            const address = await Adress.create({
                zipcode,
                street,
                number,
                user_id,
            });

            return res.json(address);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    }
}