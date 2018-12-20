const request = require('request-promise');
const querystring = require('querystring');
const fs = require('fs');
class Exporter {
    constructor() {}

    getCameras() {
        const opts = {
            method: 'GET',
            uri: 'https://tst-ckan.dataplatform.nl/api/3/action/datastore_search?' + querystring.stringify({
                resource_id: 'b5a0a3a4-1146-4e37-8311-1a8dd79f77c7',
                limit: 1000000
            }),
            json:true
        };

        return request(opts).then(ckanResponse => {
            return this.formatCkanResponse(ckanResponse);
            
        })
    }


    formatCkanResponse(ckanResponse) {
        const cameras = ckanResponse.result.records;
        const formattedCameras = cameras.map(camera => {
            const formattedCamera = {
                id: camera._id,
                properties: {
                    kijkrichting: camera.kijkrichting,
                    doel: camera.doel,
                    eigenaar: camera.eigenaar,
                    'camera-type': camera['camera-type']
                },
                geometry: {
                    type: 'Point',
                    coordinates: [
                        camera.longitude, camera.latitude
                    ]
                }
            }
            return formattedCamera;
        });
        return {
            type: 'FeatureCollection',
            features: formattedCameras
        };
    }

    writeFile(featureCollection) {
        fs.writeFileSync('./cameras.json', JSON.stringify(featureCollection));
    }

    run() {
        this.getCameras().then(cameras => {
            this.writeFile(cameras);
        });
    }



}

const exporter = new Exporter();

exporter.run();