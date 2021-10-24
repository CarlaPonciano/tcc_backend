const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init (sequelize) {
        super.init({
            name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate (models) {
        this.hasMany(models.Campaign, { foreignKey: 'creator_user_id', as: 'user_campaigns' })
    }
}

module.exports = User;