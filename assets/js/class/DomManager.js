"use strict";

class DomManager {
    constructor() {
    }

    createEle = (attrib = false) => {
        let tag = false;
        if (attrib) {
            attrib.tag = attrib.tag ?? 'div';
            tag = document.createElement(attrib.tag); // Always create the element
            attrib.id ? tag.id = attrib.id : '';
            attrib.borderRadius ? tag.style.borderRadius = attrib.borderRadius : '';
            attrib.zIndex ? tag.style.zIndex = attrib.zIndex : '';
            attrib.className ? tag.className = attrib.className : '';
            attrib.position ? tag.style.position = attrib.position : '';
            attrib.width ? tag.style.width = attrib.width : '';
            attrib.height ? tag.style.height = attrib.height : '';
            attrib.top ? tag.style.top = attrib.top : '';
            attrib.left ? tag.style.left = attrib.left : '';
            attrib.right ? tag.style.right = attrib.right : '';
            attrib.bottom ? tag.style.bottom = attrib.bottom : '';
            attrib.overflow ? tag.style.overflow = attrib.overflow : '';
            attrib.backgroundColor ? tag.style.backgroundColor = attrib.backgroundColor : '';
            attrib.color ? tag.style.color = attrib.color : '';
            attrib.display ? tag.style.display = attrib.display : '';
            attrib.flexDirection ? tag.style.flexDirection = attrib.flexDirection : '';
            attrib.justifyContent ? tag.style.justifyContent = attrib.justifyContent : '';
            attrib.alignItems ? tag.style.alignItems = attrib.alignItems : '';
            attrib.textContent ? tag.textContent = attrib.textContent : '';
        }
        return tag ?? false;
    }
}
