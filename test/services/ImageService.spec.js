import chai from 'chai'
import spies from 'chai-spies'
import path from 'path'

let expect = chai.expect;
chai.use(spies);

let ImagesService = require(path.join(process.cwd(), 'app/services/ImagesService.js')).default;

// mocks
let response = { data: [] },
    $http = {
        get: function(endpoint, opts) {
            return {
                then: function(successCb, errorCb) {
                    successCb(response);
                }
            }
        }
    },
    ENDPOINTS = {
        imagesSource: 'testendpoint'
    };

describe('ImageService', function() {
    let imageService = new ImagesService($http, ENDPOINTS);

    describe('#getImages', function() {
        it('should make get request to imagesSource endpoint', function() {
            $http.get = chai.spy('get', $http.get);
            imageService.getImages();

            expect($http.get).to.have.been.called();
        })
    })
})