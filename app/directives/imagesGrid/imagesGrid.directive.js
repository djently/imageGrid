import './imagesGrid.css';
import ImagesGridController from './imagesGrid.controller.js';

function imagesGridDirective() {
    return {
        transclude: true,
        scope: {
            width: '@',
            padding: '@',
            images: '=',
            onRemove: '&'
        },
        bindToController: true,
        templateUrl: '/templates/imagesGrid/imagesGrid.html',
        restrict: 'AE',
        controller: ImagesGridController,
        controllerAs: 'ig'
    };
}

export default imagesGridDirective;