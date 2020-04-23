const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async index (req, res) {
        const users = await User.scope('withoutPassword').findAll();
        
        return res.json({users, user:req.userId});
    },

    async store (req, res) {
        const { email, password_hash } = req.body;

        try {
            if (await User.findOne({ where: {email: email } })) {
                return res.status(400).send({ error: "User already exists" });
            }

            // password encryption
            const hash = await bcrypt.hash(password_hash, 10);
            req.body.password_hash = hash;

            const user = await User.create(req.body);

            user.password_hash = undefined;
            
            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: authConfig.experisIn,
            });
            
            return res.json({user, token});
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Registration failed' });
        }
    }
}