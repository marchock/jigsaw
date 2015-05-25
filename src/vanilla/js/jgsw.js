/*global Object, Jigsaw */

//The Object.defineProperty() method defines a new property directly on an object
function JGSW(name, func) {
    var config = {
        writable: true,
        enumerable: true,
        configurable: true,
        value: func
    };
    Object.defineProperty(Jigsaw.prototype, name, config);
}