class ImageGridController {
    constructor(ImagesService) {
        this.images = [];

        ImagesService.getImages(1, 50).then((images) => {
            this.images = this.images.concat(images);
        })
    }

    removeImage(img) {
        this.images.splice(this.images.indexOf(img), 1);
    }
}

ImageGridController.$inject = ['ImagesService'];

export default ImageGridController;