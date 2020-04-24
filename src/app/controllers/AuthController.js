const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

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

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: authConfig.experisIn,
            });

            user.password_hash = undefined;
            user.password_reset_token = undefined;
            user.password_reset_expires = undefined;
            
            return res.json({ user, token });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Login failed' });
        }
    },

    async forgot (req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: {email: email } });

            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }

            const token = crypto.randomBytes(20).toString('HEX');
            
            const now = new Date();
            now.setHours(now.getHours() + 1);

            user.password_reset_token = token;
            user.password_reset_expires = now;
            await user.save();

            await mailer.sendMail({
                to: email,
                from: 'lucascoelho@mabelishop.com',
                template: 'auth/forgot_password',
                context: { token }
            }, (err) => {
                if (err){
                    console.log(err);
                    return res.status(400).send({ error: 'Cannot send forgot password email' });
                }
                return res.send();
            });

        } catch (err) {            
            return res.status(400).send({ error: 'Error in forgor password, try again' });
        }
    },

    async reset (req, res) {
        const { email, token, password_hash } = req.body;

        try {
            const user = await User.findOne({ where: {email: email } });

            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }

            if (token !== user.password_reset_token) {
                return res.status(400).send({ error: 'Token invalid' });
            }

            const now = new Date();

            if (now > user.password_reset_expires) {
                return res.status(400).send({ error: 'Token expired, generate a new one' });
            }

            // password encryption
            const hash = await bcrypt.hash(password_hash, 10);
            user.password_hash = hash;

            await user.save();

            res.send();
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error in forgor password, try again' });
        }
    }
}