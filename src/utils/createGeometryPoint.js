module.exports = {
    createGeometryPoint (latitude, longitude) {
        const latitude_longitude = {
            type: 'Point',
            coordinates: [latitude, longitude]
        };

        return latitude_longitude;
    }
}