var log = function () {
    
}

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return element
    }
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return elements
    }
}
var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        log('classname', className, e)
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

let timeTransform = (t) => {
    //10分钟内的分秒格式转换
    if (t < 10) {
        return `00:0${t}`
    } else if (t >= 10 && t < 60) {
        return `00:${t}`
    } else {
        let minute = Math.floor(t / 60)
        let second = t % 60
        if (second < 10) {
            return `0${minute}:0${second}`
        }
        return `0${minute}:${second}`
    }
}
