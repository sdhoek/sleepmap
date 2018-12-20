
const async = require('async');
const request = require('request-promise');

class DataInserter {
    constructor(resourceId) {
        this.resourceId = resourceId;
        this.toInsert = [];
        this.maxConcurrency = 1;
    }

    prepare(cameraFileLocation) {
        const cameras = require(cameraFileLocation);
        this.toInsert = cameras.features.map(camera => {
            return {
                latitude: camera.geometry.coordinates[1],
                longitude: camera.geometry.coordinates[0],
                eigenaar: camera.properties.eigenaar,
                kijkrichting: 'noord',
                "camera-type": 'camera',
                doel: ''
            }
        });
        
    }

    doRequest(object, callback) {
        const opts = {
            method: 'POST',
            uri: 'https://tst-ckan.dataplatform.nl/api/3/action/datastore_upsert?',
            headers: {
                Authorization: '75d12966-846f-4236-8e66-853a81a56dfb'
            },
            body: {
                resource_id: this.resourceId,
                records: [object],
                method: 'insert',
                force: true
            },
            json: true // Automatically stringifies the body to JSON
        }
        request(opts).then(response => {
            console.log(response);
            callback();
        }).catch(err => {
            console.error(err);
            throw err
        })
    }

    run() {
        async.eachLimit(this.toInsert, this.maxConcurrency, this.doRequest.bind(this));
    }
}




const resourceId = 'b5a0a3a4-1146-4e37-8311-1a8dd79f77c7';
const inserter = new DataInserter('b5a0a3a4-1146-4e37-8311-1a8dd79f77c7');
inserter.prepare('./camera_all_v2.json');
inserter.run();