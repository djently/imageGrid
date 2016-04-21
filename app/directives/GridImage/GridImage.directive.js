import $ from "jquery";

export default function gridImageDirective() {
    return {
        restrict: 'A',
        link: gridImageLink
    }
}

function gridImageLink(scope, element, attrs, ctrl) {
    var width = parseInt(attrs.width, 10),
        index = $(element).index(),
        minPadding = 10,
        containerWidth = $(element).parent().innerWidth(),
        columns = Math.floor(containerWidth / (width + minPadding * 2)),
        padding = Math.floor((containerWidth - width * columns) / columns);

    $(element).css({
        position: 'absolute',
        left: width * (index % 5) + padding * (index % 5 + 0.5)
    })

    $(element).on('load', function() {
        if (index / 5 < 1) { 
            $(element).css('top', padding / 2) 
        } else {
            setElementYPosition(element, index, columns, padding);
            $(element).parent().find('[grid-image]').eq(index - columns + 1)
                .one('load', function() {
                    setElementYPosition(element, index);
                })
            $(window).on('resize', function() {
                setElementYPosition(element, index, columns, padding);
            })
        }
    })
}

function setElementYPosition(element, index, columns, padding) {
    var $upperElement = getUpperItem(element, index, columns);
    console.log(element, $upperElement);

    if ($upperElement.position() && $upperElement.height()) {
        console.log(index);
        $(element).css('top', $upperElement.position().top + $upperElement.height() + padding);
    }
}

function getUpperItem(element, columns) {
    var $element = $(element);
    return $element.parent().children().
        eq($element.index() - columns);
}