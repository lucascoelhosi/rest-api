const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async index (req, res) {
        const users = await User.scope('withoutPassword').findAll();
        
        return res.json(users);
    },

    async store (req, res) {
        const { password_hash } = req.body;

        try {
            // password encryption
            const hash = await bcrypt.hash(password_hash, 10);
            req.body.password_hash = hash;

            const user = await User.create(req.body);
            
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Registration failed' });
        }
    }
}