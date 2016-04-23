import $ from "jquery";

export default function gridImageDirective() {
    return {
        restrict: 'A',
        link: gridImageLink
    }
}

function gridImageLink(scope, element, attrs, ctrl) {

}