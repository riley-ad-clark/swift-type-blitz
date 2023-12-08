'use strict';

function element(string) {
    return document.createElement(string);
}

function addClass(prefix, className1, className2, className3) {
    return prefix.classList.add(className1, className2, className3);
}

function removeClass(prefix, className1, className2, className3) {
    return prefix.classList.remove(className1, className2, className3);
}

function append(prefix, suffix) {
   return prefix.appendChild(suffix);
}

function removeChild(prefix, suffix) {
    return prefix.removeChild(suffix)
}

export { element, addClass, removeClass, append, removeChild };