import $ from "jquery";

export default function gridImageDirective() {
    return {
        restrict: 'A',
        link: gridImageLink
    }
}

function gridImageLink(scope, element, attrs, ctrl) {
    var columns = parseInt(attrs.columns, 10),
        width = parseInt(attrs.width, 10);

    console.log($(element).parent().innerWidth());
}

function placeByAbsciss(element, columns, index) {
    var $element = $(element);
};

function getElementWidth($element) {

}