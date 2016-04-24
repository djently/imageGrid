var _ = {};

class ImagesService {
    constructor($http, $log, ENDPOINTS) {
        _ = { $http, ENDPOINTS, $log };
    }

    getImages(offset, count) {
        return _.$http.get(_.ENDPOINTS.imagesSource, {
            cache: true
        })
        .then(onImagesRequestSuccess.bind(this, offset, count), onImagesRequestError);
    }
}

ImagesService.$inject = ['$http', '$log', 'ENDPOINTS']

export default ImagesService;

function onImagesRequestSuccess(offset = 0, count = 0, res) {
    if (!res.data.images || !res.data.images instanceof Array) {
        return [];
    }
    return res.data.images.splice(offset, count);
}

function onImagesRequestError(res) {
    _.$log.error('Error loading images', res);
}