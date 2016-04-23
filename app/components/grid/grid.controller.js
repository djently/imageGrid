import $ from 'jquery';
import debounce from 'lodash.debounce';

class ImageGridController {
    constructor($element, $timeout, ImagesService) {
        this.$element = $element;
        this.images = [];
        this.showSpinner = true;

        ImagesService.getImages(1, 50).then((images) => {
            this.images = this.images.concat(
                images.map((image) => {
                    return Object.assign(image, {
                        loading: true,
                        loaded: false
                    });
                })
            );

            $timeout(() => {
                this.setGridColumns();
                this.showSpinner = false;
            }, 0);
        });
    }

    $onInit() {
        $(window).on('resize', 
            debounce(
                this.setGridColumns.bind(this), 
                100, {trailing: true}
            )
        );
    }

    removeImage(img) {
        this.images.splice(this.images.indexOf(img), 1);
    }

    setGridColumns() {
        var $element = $(this.$element),
            containerWidth = parseInt(
                $element.find('.ig-grid-container').innerWidth(), 10
            ),
            imageWidth = parseInt(
                $element.find('.ig-grid-container--image').innerWidth(), 10
            );

        if (!containerWidth || !imageWidth) return;

        $element.find('.ig-grid-container')
            .css('column-count', Math.floor(containerWidth / imageWidth));
    }

    countImageOnGrid() {
        return 
    }
}

ImageGridController.$inject = ['$element', '$timeout', 'ImagesService'];

export default ImageGridController;