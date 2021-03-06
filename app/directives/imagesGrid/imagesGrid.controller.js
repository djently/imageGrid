import $ from 'jquery';
import range from 'lodash.range';
import debounce from 'lodash.debounce';

class ImagesGridController {
    constructor ($element, $scope, $timeout, $window) {
        this.$element = $element;
        this.$scope = $scope;
        this.$window = $window;

        this.columnWidth = '100$';
        this.columns = [];

        $scope.$on('ig.imagesUpdated', () => {
            this.placeImages();
        })

        $window.onresize = debounce(() => {
            this.placeImages();
            $scope.$digest();
        }, 100, {trailing: true});
    }

    placeImages() {
        const columnsCount = this.getColumnsCount();
        
        this.setColumnWidth(columnsCount);
        this.columns = range(columnsCount).map(() => { return []; })

        this.images.forEach((image, index) => {
            this.columns[index % columnsCount].push(image);
        });
    }

    getColumnsCount() {
        var $element = $(this.$element),
            containerWidth = $element.parent().width(),
            imageWidth = parseInt(this.width, 10) || 300,
            padding = parseInt(this.padding, 10) || 10;

        if (!containerWidth || !imageWidth) return 1;
        return Math.floor(containerWidth / (imageWidth + 2 * padding));
    }

    setColumnWidth(columnsCount) {
        this.columnWidth = 100 / columnsCount + '%';
    }

    removeImage(image) {
        var imageIndex = this.images.indexOf(image);
        if (imageIndex >= 0) {
            this.onRemove();
            this.images.splice(imageIndex, 1);
            this.placeImages();
        }
    }
}

ImagesGridController.$inject = ['$element', '$scope', '$timeout', '$window'];

export default ImagesGridController;