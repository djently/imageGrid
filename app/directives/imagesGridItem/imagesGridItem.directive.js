import './imagesGridItem.css';
import $ from 'jquery';

function imagesGridItemDirective() {
    return {
        scope: {
            image: '=',
            padding: '='
        },
        restrict: 'E',
        templateUrl: '/templates/imagesGridItem/imagesGridItem.html',
        link: {
            pre: imagesGridItemPrelink
        }
    };
}

export default imagesGridItemDirective;

function imagesGridItemPrelink(scope, element) {
    const $img = $(element).children();

    $img.on('load', () => $img.addClass('igi-item--loaded'));
}