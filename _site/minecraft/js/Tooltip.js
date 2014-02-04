
var Tooltip = function (className) {
    this.el = '<div class="' + className + '"></div>';
    this.$el = $(this.el);
}

Tooltip.prototype = {
    
    setContent: function (content) {
        content = $(content);
        this.empty();
        this.$el.append(content);
    },

    empty: function () {
        this.$el.empty();
    },

    hide: function () {
        this.$el.hide();
    },

    show: function () {
        this.$el.show();
    }

}