const User = require('../../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = {
    async auth (req, res) {
        const { email, password_hash } = req.body;

        try {
            const user = await User.findOne({ where: {email: email } });

            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }

            if (!await bcrypt.compare(password_hash, user.password_hash)) {
                return res.status(400).send({ error: 'Invalid Password' });
            }

            user.password_hash = undefined;

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400,
            });
            
            return res.json({ user, token });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Login failed' });
        }
    }
}