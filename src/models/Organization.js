const { Model, DataTypes } = require('sequelize');

class Organization extends Model {
    static init (sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            profile_picture: DataTypes.STRING,
            address: DataTypes.STRING,
            latitude_longitude: DataTypes.GEOMETRY,
        }, {
            sequelize
        })
    }

    static associate (models) {
        this.hasMany(models.Campaign, { foreignKey: 'creator_organization_id', as: 'organization_campaigns' })
    }
}

module.exports = Organization;