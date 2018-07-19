var log = console.log.bind(console)

var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    return elements
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}


