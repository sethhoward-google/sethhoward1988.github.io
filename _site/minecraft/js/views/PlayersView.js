
var PlayersView = function () {
    this.init();
}

PlayersView.prototype = {

    init: function () {
        this.el =   '<div class="content">' +
                        '<div class="players">' +
                            '<h1>Currently Online</h1>' +
                            '<table>' +
                                '<tr>' +
                                    '<th></th>' +
                                    '<th></th>' +
                                    '<th><img src="css/img/heart.png" /></th>' +
                                    '<th><img src="css/img/food.png" /></th>' +
                                '</tr>' +
                            '</table>' +
                        '</div>' +
                    '</div>';

        this.$el = $(this.el);
        this.$playersTable = this.$el.find('.players table');
        this.setup();
    },

    setup: function () {
        this.onPlayersSuccess = _.bind(this.onPlayersSuccess, this);
        Poll.getInstance().subscribe('getPlayers', [], this.onPlayersSuccess);
    },

    updatePlayer: function (player){
        var el = this.$playersTable.find('.' + player.name);
        if(el[0]){
            el.find('td[name="health"]').text(player.health);
            el.find('td[name="food"]').text(player.foodLevel);
        } else {
            this.$playersTable.append(this.getNewPlayerHTML(player));
        }
    },

    syncPlayersWithUI: function () {
        var uiPlayers = _.map(this.$playersTable.find('tr'), function (row) {
            return row.className;
        });
        for(var i = 0; i < uiPlayers.length; i++){
            if(!this.currentPlayers[uiPlayers[i]]){
                this.$playersTable.find('.' + uiPlayers[i]).remove();    
            }
        }
    },

    getNewPlayerHTML: function (player){
        var el
        var img = $('<td class="image"></td>').append($('<img></img>').attr('src', 'css/img/users/' + player.name + '.jpg'));
        var name = $('<td></td>').text(player.name);
        var health = $('<td name="health"></td>').text(player.health);
        var food = $('<td name="food"></td>').text(player.foodLevel);
        return $('<tr></tr>').append(img).append(name).append(health).append(food).addClass(player.name);
    },

    onPlayersSuccess: function (data) {
        var that = this;
        var playerCoordinates = []
        that.currentPlayers = {};

        _.each(data, function (player){
            that.currentPlayers[player.name] = player;
            playerCoordinates.push({
                name: player.name,
                overworldCoordinates: player.location,
                type: 'image',
                src: 'css/img/users/' + player.name + '.jpg'
            });
            that.updatePlayer(player);
        });

        window.map.updatePlayers(playerCoordinates);
        this.syncPlayersWithUI();
    }

}