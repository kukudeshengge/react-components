

function fixPoint(key, start, width, clientWidth) {
    var startAddWidth = start + width;
    var offsetStart = (width - clientWidth) / 2;

    if (width > clientWidth) {
        if (start > 0) {
            return { [key]: offsetStart }
        }

        if (start < 0 && startAddWidth < clientWidth) {
            return { [key]: -offsetStart }
        }
    } else if (start < 0 || startAddWidth > clientWidth) {
        return { [key]: start < 0 ? offsetStart : -offsetStart }
    }

    return {};
}

function getClientSize(name) {
    var width = document.querySelector(name).clientWidth;
    var height = document.querySelector(name).clientHeight;
    return {
        width: width,
        height: height
    };
}
export default function getFixScaleEleTransPosition(width, height, left, top) {
    var _getClientSize = getClientSize('.img_box'),
        clientWidth = _getClientSize.width,
        clientHeight = _getClientSize.height;

    var fixPos = null;
    if (width <= clientWidth && height <= clientHeight) {
        fixPos = {
            x: 0,
            y: 0
        };
    } else if (width > clientWidth || height > clientHeight) {
        fixPos = {
            ...fixPoint('x', left, width, clientWidth),
            ...fixPoint('y', top, height, clientHeight)
        };
    }

    return fixPos;
}
export { getClientSize }