module.exports = {
    formatObjectLocation (object) {
        const { latitude_longitude: object_latitude_longitude } = object;
        const latitude = object_latitude_longitude.coordinates[0];
        const longitude = object_latitude_longitude.coordinates[1];

        delete object.dataValues.latitude_longitude;
        object.dataValues.latitude = latitude; 
        object.dataValues.longitude = longitude; 

        return object;
    }
}