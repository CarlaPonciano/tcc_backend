const express = require('express');
const UserController = require('./controllers/UserController');
const OrganizationController = require('./controllers/OrganizationController');
const CampaignController = require('./controllers/CampaignController')

const routes = express.Router();

routes.get('/users/:user_id', UserController.show);
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/organizations/:organization_id', OrganizationController.show);
routes.get('/organizations', OrganizationController.index);
routes.post('/organizations', OrganizationController.store);

routes.get('/campaigns/:campaign_id', CampaignController.show);
routes.get('/campaigns', CampaignController.index);
routes.post('/users/:creator_user_id/campaigns', CampaignController.storeCreatorUserCampaign);
routes.post('/organizations/:creator_organization_id/campaigns', CampaignController.storeCreatorOrganizationCampaign);

module.exports = routes;