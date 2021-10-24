const Campaign = require('../models/Campaign');
const User = require('../models/User');
const Organization = require('../models/Organization');
const { formatObjectLocation } = require('../utils/formatObjectLocation');
const { createGeometryPoint } = require('../utils/createGeometryPoint');

module.exports = {
    async show (request, response) {
        const { campaign_id } = request.params;
        
        let campaign = await Campaign.findByPk(campaign_id);

        if (!campaign) return response.status(400).json({ error: 'Campaign not found.' });

        const association = (campaign.creator_user_id) ? 'creator_user' : 'creator_organization';
        const attributes = (campaign.creator_user_id) 
            ? ['id', 'name', 'last_name', 'username', 'email', 'created_at'] 
            : ['id', 'name', 'description', 'profile_picture', 'address'];

        campaign = await Campaign.findByPk(campaign_id, {
            include: { association, attributes }
        });
        formatObjectLocation(campaign);

        return response.json(campaign);
    },

    async storeCreatorUserCampaign (request, response) {
        const { creator_user_id } = request.params;
        const { name, description, start_date, end_date, goal, picture, address, latitude, longitude } = request.body;

        const user = await User.findByPk(creator_user_id);
        if (!user) return response.status(400).json({ error: 'User not found.' });

        const latitude_longitude = createGeometryPoint(latitude, longitude); 
        const amount_raised = 0;

        const campaign = await Campaign.create({ 
            creator_user_id,
            name, 
            description, 
            start_date, 
            end_date, 
            goal, 
            amount_raised,
            picture, 
            address,
            latitude_longitude
        });

        return response.json(campaign);
    },

    async storeCreatorOrganizationCampaign (request, response) {
        const { creator_organization_id } = request.params;
        const { name, description, start_date, end_date, goal, picture } = request.body;

        const organization = await Organization.findByPk(creator_organization_id);
        if (!organization) return response.status(400).json({ error: 'Organization not found.' });

        const { address, latitude_longitude: organization_latitude_longitude } = organization;
        const latitude = organization_latitude_longitude.coordinates[0];
        const longitude = organization_latitude_longitude.coordinates[1];

        const latitude_longitude = createGeometryPoint(latitude, longitude);
        const amount_raised = 0;

        const campaign = await Campaign.create({ 
            creator_organization_id,
            name, 
            description, 
            start_date, 
            end_date, 
            goal, 
            amount_raised,
            picture, 
            address,
            latitude_longitude
        });

        return response.json(campaign);
    },

    async index (request, response) {
        const campaigns = await Campaign.findAll();
        campaigns.forEach(campaign => formatObjectLocation(campaign));

        return response.json(campaigns);
    }
}