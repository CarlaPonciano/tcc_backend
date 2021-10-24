const User = require('../models/User')

module.exports = {
    async show (request, response) {
        const { user_id } = request.params;
        
        const user = await User.findByPk(user_id);

        return response.json(user);
    },

    async index (request, response) {
        const users = await User.findAll();

        return response.json(users);
    },
    
    async store (request, response) {
        const { name, last_name, username, email, password } = request.body;

        const user = await User.create({ name, last_name, username, email, password });

        return response.json(user);
    }
}