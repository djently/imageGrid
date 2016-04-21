function imageGridController(ImagesService) {
    var self = this;

    self.images = [];
    self.removeImage = removeImage;

    ImagesService.getImages(1, 50).then(function(images) {
        self.images = self.images.concat(images);
    })

    function removeImage(img) {
        self.images.splice(self.images.indexOf(img), 1);
    }
}

imageGridController.$inject = ['ImagesService'];

export default imageGridController;