

Utility = function () {
    this.jsonpCounter = 0;
}

Utility.prototype = {

    jsonp: function (url, success) {

        var callbackName = this.getMethodName();

        window[callbackName] = function (data) {
            success(data);
            document.getElementById(callbackName).remove();
        }

        url += '&callback=' + callbackName;

        var script_element = document.createElement('script');

        script_element.id = callbackName;

        script_element.src = url

        document.head.appendChild(script_element);

    },

    getMethodName: function () {
        return 'sethCallback' + (this.jsonpCounter++);
    },

    bind: function (fn, context) {
        return function () {
            return fn.apply(context, arguments);
        }
    },

    createElement: function (el) {
        var div = document.createElement('div');
        div.innerHTML = el;
        return div.children();
    }

}

