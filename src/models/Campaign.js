const { Model, DataTypes } = require('sequelize');

class Campaign extends Model {
    static init (sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            goal: DataTypes.REAL,
            amount_raised: DataTypes.REAL, 
            picture: DataTypes.STRING,
            address: DataTypes.STRING,
            latitude_longitude: DataTypes.GEOMETRY,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'creator_user_id', as: 'creator_user' });
        this.belongsTo(models.Organization, { foreignKey: 'creator_organization_id', as: 'creator_organization' })
    }
}

module.exports = Campaign;