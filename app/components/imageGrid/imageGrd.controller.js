import $ from 'jquery';
import debounce from 'lodash.debounce';

class ImageGridController {
    constructor($element, $timeout, ImagesService) {
        this.$element = $element;
        this.images = [];

        ImagesService.getImages(1, 50).then((images) => {
            this.images = this.images.concat(images);
            $timeout(() => {
                this.setGridColumns();
            }, 0, false);
        });
    }

    removeImage(img) {
        this.images.splice(this.images.indexOf(img), 1);
    }

    $onInit() {
        $(window).on('resize', 
            debounce(
                this.setGridColumns.bind(this), 
                100, {trailing: true}
            )
        );
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
}

ImageGridController.$inject = ['$element', '$timeout', 'ImagesService'];

export default ImageGridController;