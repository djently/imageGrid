import './GridImage.css';
import $ from "jquery";

export default function gridImageDirective() {
    return {
        restrict: 'A',
        link: {
            pre: gridImageLink
        }
    }
}

function gridImageLink(scope, element) {
    const $element = $(element);

    $element.addClass('grid-image');

    $element.on('load', () => {
        $element.addClass('grid-image--loaded');
    });
}