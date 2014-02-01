
var ClockView = function () {
    this.init();
}

ClockView.prototype = {

    init: function () {
        this.el = '<div class="clock-container">' +
                        '<div class="clock">' +
                            '<img src="css/img/clock.png"></img>' +
                            '<div class="pointer"></div>' +
                        '</div>' +
                    '</div>';

        this.$el = $(this.el);
        this.$pointer = this.$el.find('.pointer');
        this.setup();
    },

    setup: function () {
        this.onServerSuccess = _.bind(this.onServerSuccess, this);
        Poll.getInstance().subscribe('getWorlds', [], this.onServerSuccess);
    },

    onServerSuccess: function (data) {
        var world = data[0];
        var time = world.time;
        var degrees = (360/24000) * time;

        this.$pointer.css({
            '-webkit-transform':'rotate(' + degrees + 'deg)'
        });
    }
}