const { Op } = require('sequelize');
const User = require('../../models/User');

module.exports = {
    async show (req, res) {
        // encontrar todos os usuarios que tem email que termina com '@teste.com'
        // Desses usuarios quais moram na 'rua pedro claro'
        // Desses usuarios quais as tecnologias começam com 'React'

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.like]: '%@teste.com'
                }
            },
            include: [
                { association: 'adresses', where: { street: 'Rua Pedro Claro' }, attributes: [`street`] }, // Endereços
                { 
                    association: 'techs',
                    required: false, // Left Outer Join
                    where: { 
                        name: { [Op.like]: 'Node%' } }, 
                        attributes: [`name`], 
                        through: { attributes: [] 
                    } 
                }, // Tecnologias                
            ]
        });

        return res.json(users);
    }
}