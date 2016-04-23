import $ from 'jquery';
import debounce from 'lodash.debounce';

var _ = {};

class ImagesProviderController {
    constructor($element, $timeout, $scope, ImagesService) {
        _ = { ImagesService };
        this.$element = $element;
        this.$scope = $scope;
        this.$timeout = $timeout;

        this.images = [];
        this.ImagesServiceOffset = 0;
        this.loadImages();
    }

    $onInit() {
        // $(this.$element).find('.ig-grid').on('scroll', debounce(
        //         this.scrollHandler.bind(this),
        //         100, {trailing: true}
        //     )
        // );
    }

    loadImages() {
        this.showSpinner = true;
        return _.ImagesService
            .getImages(this.ImagesServiceOffset, 50)
            .then((images) => {
                this.ImagesServiceOffset += images.length;
                this.images = this.images.concat(images);

                this.$timeout(() => {
                    this.showSpinner = false;
                    this.$scope.$broadcast('ig.imagesUpdated', true);
                }, 0);
                return true;
            });
    }

    removeImage(img) {
        this.images.splice(this.images.indexOf(img), 1);
    }
}

ImagesProviderController.$inject = ['$element', '$timeout', '$scope', 'ImagesService'];

export default ImagesProviderController;