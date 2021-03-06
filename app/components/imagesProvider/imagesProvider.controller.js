import $ from 'jquery';
import debounce from 'lodash.debounce';

var _ = {};

class ImagesProviderController {
    constructor($element, $timeout, $scope, $window, ImagesService) {
        _ = { ImagesService };
        this.$element = $element;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$window = $window;

        this.images = [];
        this.loadedImages = 0;
        this.ImagesServiceOffset = 0;

        this.showSpinner = true;
        this.loadImages()
            .then(() => this.showSpinner = false);

        $scope.$on(
            'igiItem.loaded',
            debounce(() => {
                this.loadedImagesCounter();
                $scope.$digest();
            }, 100)
        );
    }

    $onInit() {
        $(this.$element).find('.ip-container').on('scroll', debounce(
                this.scrollHandler.bind(this),
                100, {trailing: true}
            )
        );
    }

    loadImages() {
        return _.ImagesService
            .getImages(this.ImagesServiceOffset, 50)
            .then((images) => {
                this.ImagesServiceOffset += images.length;
                this.images = this.images.concat(images);

                this.$timeout(() => {
                    if (images.length) {
                        this.$scope.$broadcast('ig.imagesUpdated', true);
                    }
                }, 0);
                return true;
            });
    }

    scrollHandler() {
        if (this.loadedImages < this.images.length) return;
        const $ipContainer = $(this.$element).find('.ip-container'),
              scrollPosition = $ipContainer.scrollTop() + $ipContainer.height(),
              gridHeight = $ipContainer.children().height()

        if (scrollPosition > gridHeight - 100) {
            this.loadImages();
        }
    }

    loadedImagesCounter() {
        this.loadedImages = this.images.reduce((counter, image) => {
            return image.loaded ? ++counter : counter;
        }, 0);
        this.scrollHandler();
    }
}

ImagesProviderController.$inject = ['$element',
                                    '$timeout',
                                    '$scope',
                                    '$window',
                                    'ImagesService'
                                    ];

export default ImagesProviderController;