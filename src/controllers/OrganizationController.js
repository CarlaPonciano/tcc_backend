const Organization = require('../models/Organization');
const { formatObjectLocation } = require('../utils/formatObjectLocation');
const { createGeometryPoint } = require('../utils/createGeometryPoint');

module.exports = {
    async show (request, response) {
        const { organization_id } = request.params;
        
        const organization = await Organization.findByPk(organization_id);

        formatObjectLocation(organization);

        return response.json(organization);
    },

    async store (request, response) {
        const { name, description, profile_picture, address, latitude, longitude } = request.body;

        const latitude_longitude = createGeometryPoint(latitude, longitude);

        const organization = await Organization.create({ 
            name, 
            description, 
            profile_picture, 
            address, 
            latitude_longitude
        });

        return response.json(organization);
    },

    async index (request, response) {
        const organizations = await Organization.findAll();
        organizations.forEach(organization => formatObjectLocation(organization));

        return response.json(organizations);
    }
}